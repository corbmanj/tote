import React from 'react'
import axios from 'axios'
import cloneDeep from 'lodash.clonedeep'

export const AppContext = React.createContext({})
export const AppConsumer = AppContext.Consumer

const baseUrl = process.env.NODE_ENV === 'production' ? '' : 'http://localhost:8080'

export class AppProvider extends React.Component {
    constructor(props) {
        super(props)

        this.state = this.initialState()
    }

    initialState() {
        const defaultState = {
            stage: 'login',
            showToast: false,
            tote: {}
        };
        // if localStorage.userId, load user info

        // if localStorage.tripId, load trip info

        return defaultState;
    }

    setUser = (userId) => {
        window.localStorage.setItem('userId', userId)
        this.setState({ userId })
    }

    clearTote = () => {
        this.setState((prevState) => ({
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

    getTripList = async () => {
        try {
            const response = await axios.get(`${baseUrl}/db/tote/getTrips/${this.state.userId}`)
            this.setState({ tripList: response.data })
        } catch (err) {
            console.error(err)
        }
    }

    setShowToast = (toastProps) => {
        this.setState({ showToast: true, toastProps })
        setTimeout(() => { this.setState({ showToast: false }) }, 1500)
    }

    setStartDate = (startDate) => {
        this.setState({ startDate })
    }

    setEndDate = (endDate) => {
        this.setState({ endDate })
    }

    setCity = (city) => {
        this.setState({ city })
    }

    setDays = (days) => {
        this.setState({ days })
    }

    setNumDays = (numDays) => {
        this.setState({ numDays: numDays })
    }

    setSchedule = async (startDate, endDate, numDays, days, city) => {
        this.setState({
            startDate,
            endDate,
            numDays: numDays,
            days,
            city,
            stage: 'select'
        }, () => this.saveTrip())
    }

    setTote = (tote) => {
        const conditionallySave = this.state.tripId ? this.saveTrip : () => { }
        this.setState({ tote }, () => conditionallySave())
    }

    getTrip = async (tripId) => {
        var myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/json');
        const url = `${baseUrl}/db/tote/getTrip/${tripId}`
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
        const { trip, tote } = response.data
        const { days, startDate, endDate, location } = trip
        this.setTripId(trip.id)
        this.setState({
            days,
            startDate,
            endDate,
            city: location,
            tote
        })
    }

    setTrip = async (trip, stage = 'schedule') => {
        window.localStorage.setItem('tripId', trip.id)
        await this.getTrip(trip.id)
        this.setState({ stage })
    }

    setTripId = (tripId) => {
        window.localStorage.setItem('tripId', tripId)
        this.setState({ tripId })
    }

    setOutfitTypes = (outfitTypes) => {
        this.setState({ outfitTypes })
    }

    // Setup Section

    addOutfitType = async () => {
        var myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/json');

        let newType = { type: "new outfit type", items: [] }
        let outfitTypes = [...this.state.outfitTypes]
        outfitTypes.push(newType)

        try {
            const result = await axios.post(
                `${baseUrl}/db/addOutfit/${this.state.userId}`,
                newType,
                {
                    method: 'POST',
                    headers: myHeaders,
                    mode: 'cors',
                    cache: 'default'
                }
            )
            outfitTypes[outfitTypes.length - 1].id = result.data.id
            this.setOutfitTypes(outfitTypes)
        } catch (err) {
            console.error(err)
        }
    }

    updateOutfitTypeById = (newOutfit) => {
        this.setState(prevState => {
            const newOutfits = [...prevState.outfitTypes]
            const oldIndex = newOutfits.findIndex(outfit => outfit.id === newOutfit.id)
            newOutfits.splice(oldIndex, 1, newOutfit)
        }, () => this.saveUserSettings('outfit', newOutfit))
    }

    updateOutfitType = (newOutfit, outfitIndex) => {
        this.setState(prevState => {
            const newOutfits = [...prevState.outfitTypes]
            newOutfits[outfitIndex] = newOutfit
            return { outfitTypes: newOutfits }
        }, () => this.saveUserSettings('outfit', newOutfit))
    }

    removeOutfitType = async (outfitId) => {
        var myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/json');

        try {
            const response = await axios.delete(
                `${baseUrl}/db/deleteOutfit/${this.state.userId}/${outfitId}`,
                {
                    method: 'DELETE',
                    headers: myHeaders,
                    mode: 'cors',
                    cache: 'default'
                })
            const newOutfits = this.state.outfitTypes.filter(outfit => outfit.id !== response.data.id)
            this.setOutfitTypes(newOutfits)
        } catch (err) {
            console.error(err)
        }
    }

    setAdditionalItems = (additionalItems) => {
        this.setState({ additionalItems })
    }

    selectAdditionalItem = (sectionId, itemId, isSelected) => {
        this.setState((prevState) => {
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

    addAdditionalItem = (categoryId, itemName) => {
        const additionalItems = [...this.state.additionalItems]
        const index = additionalItems.findIndex(category => categoryId === category.id)
        if (index > -1) {
            const maxId = additionalItems[index].items.reduce((a, b) => {
                return +a > +b.id ? +a : +b.id
            }, -1)
            const newId = maxId + 1
            additionalItems[index].items.push({ id: newId, name: itemName })
            this.setState({ additionalItems })
        }
    }

    addAdditionalItemCategory = async () => {
        let myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/json');
        const newCategory = {
            name: "temporary",
            items: []
        }
        try {
            const result = await axios.post(
                `${baseUrl}/db/additionalItems/${this.state.userId}`,
                newCategory,
                {
                    method: 'POST',
                    headers: myHeaders,
                    mode: 'cors',
                    cache: 'default'
                })
            newCategory.id = result.id
            const tempItemCategories = [...this.state.additionalItems]
            tempItemCategories.push(newCategory)
            this.setAdditionalItems(tempItemCategories)
        } catch (err) {
            console.error(err)
        }
    }

    updateAdditionalItemCategory = async (itemList, id, name) => {
        var myHeaders = new Headers();
        let sectionToUpdate = this.state.additionalItems.findIndex(section => section.id === id)
        const itemSection = {
            name: name || this.state.additionalItems[sectionToUpdate].name,
            items: itemList
        }
        myHeaders.append('Content-Type', 'application/json');

        try {
            await axios.put(
                `${baseUrl}/db/updateAdditionalItems/${this.state.userId}/${id}`,
                itemSection,
                {
                    method: 'PUT',
                    headers: myHeaders,
                    mode: 'cors',
                    cache: 'default'
                }
            )
            const tempItemCategories = [...this.state.additionalItems]
            tempItemCategories[sectionToUpdate] = itemSection
            this.setAdditionalItems(tempItemCategories)
        } catch (err) {
            console.error(err)
        }
    }

    deleteAdditionalItemCategory = async (index) => {
        var myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/json');

        const sectionId = this.state.additionalItems[index].id

        try {
            const response = await axios.delete(
                `${baseUrl}/db/deleteAdditionalItemSection/${this.state.userId}/${sectionId}`,
                {
                    method: 'DELETE',
                    headers: myHeaders,
                    mode: 'cors',
                    cache: 'default'
                }
            )
            const newAdditionalItems = this.state.additionalItems.filter(section => section.id !== response.data.id)
            this.setAdditionalItems(newAdditionalItems)
        } catch (err) {
            console.error(err)
        }

    }

    // select Outfits
    addOutfit = (dayIndex) => {
        this.setState(prevState => {
            const newId = prevState.days[dayIndex].outfits.length ? Math.max(...prevState.days[dayIndex].outfits.map(item => item.id)) + 1 : 1
            const newOutfit = {
                name: 'Outfit ' + newId,
                expanded: true,
                items: []
            }
            let updatedDays = [...prevState.days]
            updatedDays[dayIndex].outfits.push(newOutfit)
            return { days: updatedDays }
        }, () => this.saveTrip())
    }

    setOutfit = (dayIndex, outfitIndex, outfit) => {
        this.setState(prevState => {
            const tempDays = [...prevState.days]
            tempDays[dayIndex].outfits[outfitIndex] = outfit
            return { days: tempDays }
        }, () => this.saveTrip())
    }

    removeOutfit = (dayIndex, outfitIndex) => {
        this.setState(prevState => {
            const tempDays = [...prevState.days]
            tempDays[dayIndex].outfits.splice(outfitIndex, 1)
            return { days: tempDays }
        }, () => this.saveTrip())
    }

    setExpanded = (dayIndex, outfitIndex) => {
        this.setState(prevState => {
            const tempDays = [...prevState.days]
            tempDays[dayIndex].outfits[outfitIndex].expanded = !prevState.days[dayIndex].outfits[outfitIndex].expanded
            return { days: tempDays }
        })
    }

    expandAll = () => {
        this.setState(prevState => {
            const tempDays = [...prevState.days]
            tempDays.forEach(day => {
                day.outfits.forEach(outfit => {
                    outfit.expanded = true
                })
            })
            return { days: tempDays }
        })
    }

    toggleOutfitItem = (dayIndex, outfitIndex, itemName, isChecked) => {
        this.setState(prevState => {
            let tempOutfit = cloneDeep(prevState.days[dayIndex].outfits[outfitIndex])
            tempOutfit.items.forEach((item) => {
                if (item.type === itemName) { item.isNotIncluded = !isChecked }
            })
            prevState.days[dayIndex].outfits[outfitIndex] = tempOutfit
            return { days: prevState.days }
        })

    }

    // Assign Items
    addNamedItem = (parentType, value, newId) => {
        this.setState(prevState => {
            let named = prevState.tote.named || []
            let newItem = { parentType: parentType, name: value, id: newId }
            named.push(newItem)
            return { tote: { ...prevState.tote, named } }
        }, () => this.saveTrip())
    }

    updateOutfitItem = (dayIndex, outfitIndex, parentType, itemId) => {
        this.setState(prevState => {
            const days = [...prevState.days]
            days[dayIndex].outfits[outfitIndex].items.find(item => item.parentType === parentType).id = itemId
            return { days }
        }, () => this.saveTrip())
    }

    saveTrip = async (currentState = this.state) => {
        var myHeaders = new Headers();

        myHeaders.append('Content-Type', 'application/json');
        const { startDate, endDate, city, days, tote } = currentState

        try {
            const response = await axios.post(
                `${baseUrl}/db/tote/updateTrip/${this.state.tripId}`,
                { startDate, endDate, city, days, tote },
                {
                    method: 'POST',
                    headers: myHeaders,
                    mode: 'cors',
                    cache: 'default'
                }
            )
            if (response.status >= 400) {
                throw new Error("Bad response from server")
            } else {
                const { trip, tote } = response.data
                const { days, startDate, endDate, location } = trip
                this.setTripId(trip.id)
                this.setState({
                    days,
                    startDate,
                    endDate,
                    city: location,
                    tote
                })
            }
        } catch (err) {
            console.error(err)
        }
    }

    saveUserSettings = async (setting, update) => {
        let url = ''
        switch (setting) {
            case 'outfit':
            default:
                url = `${baseUrl}/db/userItems/${this.state.userId}/${update.id}`
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

    handleReload = async () => {
        if (!this.state.userId && !this.state.tripId) {
            var myHeaders = new Headers();
            myHeaders.append('Content-Type', 'application/json');

            try {
                const userId = window.localStorage.getItem('userId')
                const tripId = window.localStorage.getItem('tripId')
                if (userId && tripId) {
                    this.getTrip(tripId)
                }
                else {
                    console.error('no userId or tripId')
                }
            } catch (err) {
                console.error(err)
            }
        }
    }

    render() {
        const { children } = this.props;

        return (
            <AppContext.Provider
                value={{
                    userId: this.state.userId,
                    clearTote: this.clearTote,
                    setUser: this.setUser,
                    showToast: this.state.showToast,
                    toastProps: this.state.toastProps,
                    setShowToast: this.setShowToast,
                    startDate: this.state.startDate,
                    setStartDate: this.setStartDate,
                    endDate: this.state.endDate,
                    setEndDate: this.setEndDate,
                    city: this.state.city,
                    setCity: this.setCity,
                    days: this.state.days,
                    setDays: this.setDays,
                    numDays: this.state.numDays,
                    setNumDays: this.setNumDays,
                    setSchedule: this.setSchedule,
                    outfitTypes: this.state.outfitTypes,
                    setOutfitTypes: this.setOutfitTypes,
                    updateOutfitType: this.updateOutfitType,
                    updateOutfitTypeById: this.updateOutfitTypeById,
                    removeOutfitType: this.removeOutfitType,
                    addOutfitType: this.addOutfitType,
                    additionalItems: this.state.additionalItems,
                    setAdditionalItems: this.setAdditionalItems,
                    selectAdditionalItem: this.selectAdditionalItem,
                    addAdditionalItem: this.addAdditionalItem,
                    addAdditionalItemCategory: this.addAdditionalItemCategory,
                    updateAdditionalItemCategory: this.updateAdditionalItemCategory,
                    deleteAdditionalItemCategory: this.deleteAdditionalItemCategory,
                    tote: this.state.tote,
                    setTote: this.setTote,
                    tripId: this.state.tripId,
                    setTripId: this.setTripId,
                    setTrip: this.setTrip,
                    addOutfit: this.addOutfit,
                    setOutfit: this.setOutfit,
                    removeOutfit: this.removeOutfit,
                    setExpanded: this.setExpanded,
                    expandAll: this.expandAll,
                    updateOutfitItem: this.updateOutfitItem,
                    addNamedItem: this.addNamedItem,
                    rawState: this.state,
                    handleReload: this.handleReload,
                    tripList: this.state.tripList,
                    getTripList: this.getTripList,
                    toggleOutfitItem: this.toggleOutfitItem,
                }}
            >
                {children}
            </AppContext.Provider>
        );
    }
}
