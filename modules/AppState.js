import React from 'react'
import axios from 'axios'

export const AppContext = React.createContext({})
export const AppConsumer = AppContext.Consumer

const baseUrl = process.env.NODE_ENV === 'production' ? '' : 'http://localhost:8080'

export class AppProvider extends React.Component {
    constructor(props) {
        super(props)

        this.state = this.initialState()
    }

    initialState () {
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

    setStage = (stage) => {
        const conditionallySave = this.state.tripId ? this.saveTrip : () => {}
        this.setState({ stage }, () => conditionallySave())
    }

    setShowToast = (toastProps) => {
        this.setState({showToast: true, toastProps})
        setTimeout(() => { this.setState({showToast: false}) }, 1500)
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
        const conditionallySave = this.state.tripId ? this.saveTrip : () => {}
        this.setState({ tote }, () => conditionallySave())
    }

    setTrip = async (trip) => {
        window.localStorage.setItem('tripId', trip.tripId)
        this.setState({
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

    setTripId = (tripId) => {
        this.setState({ tripId })
    }

    setOutfitTypes = (outfitTypes) => {
        this.setState({ outfitTypes })
    }

    // Setup Section

    addOutfitType = async () => {
        var myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/json');

        let newType = {type: "new outfit type", items: []}
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
        } catch(err) {
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
                id: newId,
                realName: 'Outfit ' + newId,
                expanded: true
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

    // Assign Items
    addNamedItem = (parentType, value, newId) => {
        this.setState(prevState => {
            let namedItems = prevState.tote.namedItems || []
            let newItem = {parentType: parentType, name: value, id: newId}
            namedItems.push(newItem)
            return { tote: {...prevState.tote, namedItems}}
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
    
        try {
            const response = await axios.post(
                `${baseUrl}/db/tote/updateTrip/${this.state.tripId}`,
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
              this.setTrip(response.data[0])
            }
            else {
                this.setStage('login')
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
                    stage: this.state.stage,
                    setStage: this.setStage,
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
                    handleReload: this.handleReload
                }}
            >
                {children}
            </AppContext.Provider>
        );
    }
}
