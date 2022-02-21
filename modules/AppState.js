import React, { useState } from 'react'
import axios from 'axios'
import cloneDeep from 'lodash.clonedeep'
import { useHistory } from 'react-router-dom'

export const AppContext = React.createContext({})
export const AppConsumer = AppContext.Consumer

const baseUrl = process.env.NODE_ENV === 'production' ? '' : 'http://localhost:8080'

export function AppProvider(props) {
    const history = useHistory()
    const [state, setState] = useState({
        stage: 'login',
        showToast: false,
        tote: {}
    })


    // initialState() {
    //     const defaultState = {
    //         stage: 'login',
    //         showToast: false,
    //         tote: {}
    //     };
    //     // if localStorage.userId, load user info

    //     // if localStorage.tripId, load trip info

    //     return defaultState;
    // }

    const setUser = (userId) => {
        window.localStorage.setItem('userId', userId)
        setState({ userId })
    }

    const clearTote = () => {
        setState((prevState) => ({
            tote: {
                additionalItems: prevState.additionalItems
            },
            days: null,
            startDate: null,
            endDate: null,
            city: null,
            numDays: null
        }))
    }

    const getTripList = async () => {
        try {
            const response = await axios.get(`${baseUrl}/db/tote/getTrips/${state.userId}`)
            setState({ tripList: response.data })
        } catch (err) {
            console.error(err)
        }
    }

    const setShowToast = (toastProps) => {
        setState({ showToast: true, toastProps })
        setTimeout(() => { setState({ showToast: false }) }, 1500)
    }

    const setStartDate = (startDate) => {
        setState({ startDate })
    }

    const setEndDate = (endDate) => {
        setState({ endDate })
    }

    const setCity = (city) => {
        setState({ city })
    }

    const setDays = (days) => {
        setState({ days })
    }

    const setNumDays = (numDays) => {
        setState({ numDays: numDays })
    }

    const setSchedule = async (startDate, endDate, numDays, days, city) => {
        setState({
            startDate,
            endDate,
            numDays: numDays,
            days,
            city,
            stage: 'select'
        }, () => saveTrip())
    }

    const setTote = (tote) => {
        const conditionallySave = state.tripId ? saveTrip : () => { }
        setState({ tote }, () => conditionallySave())
    }

    const setTrip = async (trip) => {
        window.localStorage.setItem('tripId', trip.tripId)
        setState({
            tripId: trip.tripId,
            additionalItems: trip.additionalItems,
            city: trip.city,
            days: trip.days,
            startDate: trip.startDate,
            endDate: trip.endDate,
            outfitTypes: trip.outfitTypes,
            tote: trip.tote,
            stage: 'schedule'
        })
    }

    const setTripId = (tripId) => {
        window.localStorage.setItem('tripId', tripId)
        setState({ tripId })
    }

    const setOutfitTypes = (outfitTypes) => {
        setState({ outfitTypes })
    }

    // Setup Section

    const addOutfitType = async () => {
        var myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/json');

        let newType = { type: "double click to edit", items: [] }
        let outfitTypes = state.outfitTypes ? [...state.outfitTypes] : []
        outfitTypes.push(newType)

        try {
            const result = await axios.post(
                `${baseUrl}/db/addOutfit/${state.userId}`,
                newType,
                {
                    method: 'POST',
                    headers: myHeaders,
                    mode: 'cors',
                    cache: 'default'
                }
            )
            outfitTypes[outfitTypes.length - 1].id = result.data.id
            setOutfitTypes(outfitTypes)
        } catch (err) {
            console.error(err)
        }
    }

    const updateOutfitTypeById = (newOutfit) => {
        setState(prevState => {
            const newOutfits = [...prevState.outfitTypes]
            const oldIndex = newOutfits.findIndex(outfit => outfit.id === newOutfit.id)
            newOutfits.splice(oldIndex, 1, newOutfit)
        }, () => saveUserSettings('outfit', newOutfit))
    }

    const updateOutfitType = (newOutfit, outfitIndex) => {
        setState(prevState => {
            const newOutfits = [...prevState.outfitTypes]
            newOutfits[outfitIndex] = newOutfit
            return { outfitTypes: newOutfits }
        }, () => saveUserSettings('outfit', newOutfit))
    }

    const removeOutfitType = async (outfitId) => {
        var myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/json');

        try {
            const response = await axios.delete(
                `${baseUrl}/db/deleteOutfit/${state.userId}/${outfitId}`,
                {
                    method: 'DELETE',
                    headers: myHeaders,
                    mode: 'cors',
                    cache: 'default'
                })
            const newOutfits = state.outfitTypes.filter(outfit => outfit.id !== response.data.id)
            setOutfitTypes(newOutfits)
        } catch (err) {
            console.error(err)
        }
    }

    const setAdditionalItems = (additionalItems) => {
        setState({ additionalItems })
    }

    const selectAdditionalItem = (sectionId, itemId, isSelected) => {
        setState((prevState) => {
            const newState = cloneDeep(prevState)
            const section = newState.additionalItems.find(sec => sec.id === sectionId)
            if (section) {
                const foundItem = section.items.find(item => item.id === itemId)
                if (foundItem) {
                    foundItem.selected = !isSelected
                }
            }
            newState.tote.additionalItems = newState.additionalItems
            return newState
        })
    }

    const addAdditionalItem = (categoryId, itemName) => {
        const additionalItems = [...state.additionalItems]
        const index = additionalItems.findIndex(category => categoryId === category.id)
        if (index > -1) {
            const maxId = additionalItems[index].items.reduce((a, b) => {
                return +a > +b.id ? +a : +b.id
            }, -1)
            const newId = maxId + 1
            additionalItems[index].items.push({ id: newId, name: itemName })
            setState({ additionalItems })
        }
    }

    const addAdditionalItemCategory = async () => {
        let myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/json');
        const newCategory = {
            name: "double click to edit",
            items: []
        }
        try {
            const result = await axios.post(
                `${baseUrl}/db/additionalItems/${state.userId}`,
                newCategory,
                {
                    method: 'POST',
                    headers: myHeaders,
                    mode: 'cors',
                    cache: 'default'
                })
            newCategory.id = result.id
            const tempItemCategories = [...state.additionalItems]
            tempItemCategories.push(newCategory)
            setAdditionalItems(tempItemCategories)
        } catch (err) {
            console.error(err)
        }
    }

    const updateAdditionalItemCategory = async (itemList, id, name) => {
        var myHeaders = new Headers();
        let sectionToUpdate = state.additionalItems.findIndex(section => section.id === id)
        const itemSection = {
            id,
            name: name || state.additionalItems[sectionToUpdate].name,
            items: itemList
        }
        myHeaders.append('Content-Type', 'application/json');

        try {
            await axios.put(
                `${baseUrl}/db/updateAdditionalItems/${state.userId}/${id}`,
                itemSection,
                {
                    method: 'PUT',
                    headers: myHeaders,
                    mode: 'cors',
                    cache: 'default'
                }
            )
            const tempItemCategories = [...state.additionalItems]
            tempItemCategories[sectionToUpdate] = itemSection
            setAdditionalItems(tempItemCategories)
        } catch (err) {
            console.error(err)
        }
    }

    const deleteAdditionalItemCategory = async (index) => {
        var myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/json');

        const sectionId = state.additionalItems[index].id

        try {
            const response = await axios.delete(
                `${baseUrl}/db/deleteAdditionalItemSection/${state.userId}/${sectionId}`,
                {
                    method: 'DELETE',
                    headers: myHeaders,
                    mode: 'cors',
                    cache: 'default'
                }
            )
            const newAdditionalItems = state.additionalItems.filter(section => section.id !== response.data.id)
            setAdditionalItems(newAdditionalItems)
        } catch (err) {
            console.error(err)
        }

    }

    // select Outfits
    const addOutfit = (dayIndex) => {
        setState(prevState => {
            const newId = prevState.days[dayIndex].outfits.length ? Math.max(...prevState.days[dayIndex].outfits.map(item => item.id)) + 1 : 1
            const newOutfit = {
                id: newId,
                realName: 'Outfit ' + newId,
                expanded: true,
                items: []
            }
            let updatedDays = [...prevState.days]
            updatedDays[dayIndex].outfits.push(newOutfit)
            return { days: updatedDays }
        }, () => saveTrip())
    }

    const setOutfit = (dayIndex, outfitIndex, outfit) => {
        setState(prevState => {
            const tempDays = [...prevState.days]
            tempDays[dayIndex].outfits[outfitIndex] = outfit
            return { days: tempDays }
        }, () => saveTrip())
    }

    const removeOutfit = (dayIndex, outfitIndex) => {
        setState(prevState => {
            const tempDays = [...prevState.days]
            tempDays[dayIndex].outfits.splice(outfitIndex, 1)
            return { days: tempDays }
        }, () => saveTrip())
    }

    const setExpanded = (dayIndex, outfitIndex) => {
        setState(prevState => {
            const tempDays = [...prevState.days]
            tempDays[dayIndex].outfits[outfitIndex].expanded = !prevState.days[dayIndex].outfits[outfitIndex].expanded
            return { days: tempDays }
        })
    }

    const expandAll = () => {
        setState(prevState => {
            const tempDays = [...prevState.days]
            tempDays.forEach(day => {
                day.outfits.forEach(outfit => {
                    outfit.expanded = true
                })
            })
            return { days: tempDays }
        })
    }

    const toggleOutfitItem = (dayIndex, outfitIndex, itemName, isChecked) => {
        setState(prevState => {
            let tempOutfit = cloneDeep(prevState.days[dayIndex].outfits[outfitIndex])
            tempOutfit.items.forEach((item) => {
                if (item.type === itemName) { item.isNotIncluded = !isChecked }
            })
            prevState.days[dayIndex].outfits[outfitIndex] = tempOutfit
            return { days: prevState.days }
        })

    }

    // Assign Items
    const addNamedItem = (parentType, value, newId) => {
        setState(prevState => {
            let namedItems = prevState.tote.namedItems || []
            let newItem = { parentType: parentType, name: value, id: newId }
            namedItems.push(newItem)
            return { tote: { ...prevState.tote, namedItems } }
        }, () => saveTrip())
    }

    const updateOutfitItem = (dayIndex, outfitIndex, parentType, itemId) => {
        setState(prevState => {
            const days = [...prevState.days]
            days[dayIndex].outfits[outfitIndex].items.find(item => item.parentType === parentType).id = itemId
            return { days }
        }, () => saveTrip())
    }

    const saveTrip = async (currentState = state) => {
        var myHeaders = new Headers();

        myHeaders.append('Content-Type', 'application/json');

        try {
            const response = await axios.post(
                `${baseUrl}/db/tote/updateTrip/${state.tripId}`,
                currentState,
                {
                    method: 'POST',
                    headers: myHeaders,
                    mode: 'cors',
                    cache: 'default'
                }
            )
            if (response.status >= 400) {
                throw new Error("Bad response from server")
            }
        } catch (err) {
            console.error(err)
        }
    }

    const saveUserSettings = async (setting, update) => {
        let url = ''
        switch (setting) {
            case 'outfit':
            default:
                url = `${baseUrl}/db/userItems/${state.userId}/${update.id}`
        }
        var myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/json');

        try {
            const response = await axios.put(url,
                update,
                {
                    method: 'PUT',
                    headers: myHeaders,
                    mode: 'cors',
                    cache: 'default'
                }
            )

            if (response.status >= 400) {
                throw new Error("Bad response from server")
            }
        } catch (err) {
            console.error(err)
        }
    }

    const handleReload = async () => {
        if (!state.userId && !state.tripId) {
            var myHeaders = new Headers();
            myHeaders.append('Content-Type', 'application/json');

            try {
                const userId = window.localStorage.getItem('userId')
                const tripId = window.localStorage.getItem('tripId')
                if (userId && tripId) {
                    const url = `${baseUrl}/db/tote/getTrip/${userId}/${tripId}`
                    const response = await axios.get(url,
                        {
                            method: 'GET',
                            headers: myHeaders,
                            mode: 'cors',
                            cache: 'default'
                        }
                    )
                    if (response.status >= 400) {
                        throw new Error("Bad response from server")
                    }
                    setTrip(response.data[0])
                    setState({ userId })
                }
                else {
                    console.error('no userId or tripId')
                    history.push('/login')
                }
            } catch (err) {
                console.error(err)
            }
        }
    }

        return (
            <AppContext.Provider
                value={{
                    userId: state.userId,
                    clearTote: clearTote,
                    setUser: setUser,
                    showToast: state.showToast,
                    toastProps: state.toastProps,
                    setShowToast: setShowToast,
                    startDate: state.startDate,
                    setStartDate: setStartDate,
                    endDate: state.endDate,
                    setEndDate: setEndDate,
                    city: state.city,
                    setCity: setCity,
                    days: state.days,
                    setDays: setDays,
                    numDays: state.numDays,
                    setNumDays: setNumDays,
                    setSchedule: setSchedule,
                    outfitTypes: state.outfitTypes,
                    setOutfitTypes: setOutfitTypes,
                    updateOutfitType: updateOutfitType,
                    updateOutfitTypeById: updateOutfitTypeById,
                    removeOutfitType: removeOutfitType,
                    addOutfitType: addOutfitType,
                    additionalItems: state.additionalItems,
                    setAdditionalItems: setAdditionalItems,
                    selectAdditionalItem: selectAdditionalItem,
                    addAdditionalItem: addAdditionalItem,
                    addAdditionalItemCategory: addAdditionalItemCategory,
                    updateAdditionalItemCategory: updateAdditionalItemCategory,
                    deleteAdditionalItemCategory: deleteAdditionalItemCategory,
                    tote: state.tote,
                    setTote: setTote,
                    tripId: state.tripId,
                    setTripId: setTripId,
                    setTrip: setTrip,
                    addOutfit: addOutfit,
                    setOutfit: setOutfit,
                    removeOutfit: removeOutfit,
                    setExpanded: setExpanded,
                    expandAll: expandAll,
                    updateOutfitItem: updateOutfitItem,
                    addNamedItem: addNamedItem,
                    rawState: state,
                    handleReload: handleReload,
                    tripList: state.tripList,
                    getTripList: getTripList,
                    toggleOutfitItem: toggleOutfitItem,
                }}
            >
                {props.children}
            </AppContext.Provider>
        );
}
