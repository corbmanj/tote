async function getTrip(client, tripId) {
  const tripResult = await client.query(`
      SELECT id, location, start_date, end_date
      FROM trips
      WHERE id = $1
      `,
    [tripId]
  )
  if (!tripResult.rows.length) {
    return { error: true }
  }
  const toteResult = await client.query(`
      SELECT *
      FROM totes
      WHERE trip_id = $1 
      `,
    [tripId]
  )
  const daysResult = await client.query(`
      SELECT *
      FROM days
      WHERE trip_id = $1
      `,
    [tripId]
  )
  const dayIds = daysResult.rows.map(row => Number(row.id))
  const outfitsResult = await client.query(`
      SELECT *
      FROM outfits
      WHERE day_id = ANY ($1)
      `,
    [dayIds]
  )
  return {
    tote: {
      id: toteResult.rows[0].id,
      named: toteResult.rows[0].named,
      unnamed: toteResult.rows[0].unnamed,
      additionalItems: toteResult.rows[0].additional_items
    },
    trip: {
      id: tripResult.rows[0].id,
      location: tripResult.rows[0].location,
      startDate: tripResult.rows[0].start_date,
      endDate: tripResult.rows[0].end_date,
      days: daysResult.rows.map(day => ({
        id: day.id,
        date: day.date,
        low: day.low,
        high: day.high,
        icon: day.icon,
        precip: day.precip,
        sunrise: day.sunrise,
        sunset: day.sunset,
        summary: day.summary,
        outfits: outfitsResult.rows
          .filter(row => row.day_id === day.id)
          .map(outfit => ({
            id: outfit.id,
            dayId: outfit.day_id,
            type: outfit.type,
            expanded: outfit.expanded,
            name: outfit.name,
            items: outfit.items
          }))
      }))
      .sort((dayA, dayB) => dayA.date - dayB.date)
    },
  }
}

async function saveDays(client, days, tripId) {
  const updateDayQuery = `UPDATE days
  SET trip_id = $1, date = $2, low = $3, high = $4, icon = $5, precip = $6, sunset = $7, sunrise = $8, summary = $9
  WHERE id = $10
  returning id;`
  const createDayQuery = `INSERT INTO days (trip_id, date, low, high, icon, precip, sunset, sunrise, summary)
  VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
  returning id;`
  const updateOutfitQuery = `UPDATE outfits
  SET day_id=$1, type=$2, expanded=$3, name=$4, items=$5
  WHERE id=$6;`
  const createOutfitQuery = `INSERT INTO outfits (day_id, type, expanded, name, items)
    VALUES ($1, $2, $3, $4, $5);`
  for (const day of days) {
    // create or update the day
    const { date, low, high, icon, precip, sunset, sunrise, summary, id } = day
    const dayParams = [tripId, date, low, high, icon, precip, sunset, sunrise, summary]
    if (id) {
      dayParams.push(id)
    }
    const { rows } = await client.query(
      id ? updateDayQuery : createDayQuery,
      dayParams
    )
    const dayId = rows[0].id
    // create or update the outfits
    const outfitUpdates = day.outfits.map(outfit => {
      const outfitParams = [dayId, outfit.type, outfit.expanded, outfit.name, JSON.stringify(outfit.items)]
      if (outfit.id) {
        outfitParams.push(outfit.id)
      }
      return client.query(
        outfit.id ? updateOutfitQuery : createOutfitQuery,
        outfitParams
      )
    }
    )
    await Promise.all(outfitUpdates)
  }
}

async function saveTrip(client, data, tripId) {
  await client.query(`
    UPDATE trips
    SET start_date = $1, end_date = $2, location = $3
    WHERE id = $4
    returning id;`,
    [data.startDate, data.endDate, data.city, tripId]
  )
  await client.query(`
    INSERT INTO totes (trip_id, unnamed, named, additional_items) VALUES($1, $2, $3, $4)
    ON CONFLICT (trip_id) DO UPDATE
    SET unnamed = $2, named = $3, additional_items = $4
    returning id;
    `,
    [tripId, JSON.stringify(data.tote.unnamed), JSON.stringify(data.tote.named), JSON.stringify(data.tote.additionalItems)]
  )
  await saveDays(client, data.days, tripId)
}

module.exports = { getTrip, saveTrip }