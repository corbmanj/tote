import React from 'react'

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
            stage: 'home',
            showToast: false,
            tote: {}
        };

        return defaultState;
    }

    setUser = (userId) => {
        this.setState({ userId })
    }

    setStage = (stage) => {
        const conditionallySave = this.state.tripId ? this.saveToDB : () => {}
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

    setSchedule = (startDate, endDate, numDays, days, city) => {
        this.setState({
            startDate,
            endDate,
            numDays: numDays,
            days,
            city,
            stage: 'select'
        }, () => this.saveToDB())
    }

    setTote = (tote) => {
        const conditionallySave = this.state.tripId ? this.saveToDB : () => {}
        this.setState({ tote }, () => conditionallySave())
    }

    setTrip = (trip) => {
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

    setAdditionalItems = (additionalItems) => {
        this.setState({ additionalItems })
    }

    // select Outfits
    setOutfit = (dayIndex, outfitIndex, outfit) => {
        this.setState(prevState => {
            const tempDays = [...prevState.days]
            tempDays[dayIndex].outfits[outfitIndex] = outfit
            return {days: tempDays}
        })
    }

    saveToDB = (currentState = this.state) => {
        var myHeaders = new Headers();
    
        myHeaders.append('Content-Type', 'application/json');
    
        fetch(`${baseUrl}/db/tote/updateTrip/${this.state.tripId}`, {
            method: 'POST',
            body: JSON.stringify(currentState),
            headers: myHeaders,
            mode: 'cors',
            cache: 'default'
        })
        .then(function(response) {
            if (response.status >= 400) {
                throw new Error("Bad response from server")
            }
        });
    }

    render() {
        const { children } = this.props;

        return (
            <AppContext.Provider
                value={{
                    userId: this.state.userId,
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
                    additionalItems: this.state.additionalItems,
                    setAdditionalItems: this.setAdditionalItems,
                    tote: this.state.tote,
                    setTote: this.setTote,
                    tripId: this.state.tripId,
                    setTripId: this.setTripId,
                    setTrip: this.setTrip,
                    setOutfit: this.setOutfit,
                    rawState: this.state,
                }}
            >
                {children}
            </AppContext.Provider>
        );
    }
}
