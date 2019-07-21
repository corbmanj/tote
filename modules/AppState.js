import React from 'react'
// import {
// testTitleState, testSalaryBandState, sampleIssueStatuses
// } from '../assets/seed-data'
// import {
// SalaryBandSpreadsheet, TitleSpreadsheet, IssueStatuses
// } from '../entities/types';

// const storageName = 'appState'

export const AppContext = React.createContext({})
export const AppConsumer = AppContext.Consumer

export class AppProvider extends React.Component {
    constructor(props) {
        super(props)

        this.state = this.initialState()
    }

    initialState () {
        const defaultState = {
            title: 0
        };

        // Clears out local storage
        // if (clear) {
        // localStorage.removeItem(storageName);
        // this.setNewState(defaultState);
        // }

        return defaultState;
    }

    // load from local storage
    // loadState = () => {
    // try {
    // const strState = localStorage.getItem(storageName);
    // if (strState === null) {
    // return undefined;
    // }
    // // convert permissions arrays to sets
    // const jsonState = JSON.parse(strState);
    // return jsonState;
    // } catch (err) {
    // return undefined;
    // }
    // };

    // save to local storage
    // saveState = () => {
    // try {
    // const strState = JSON.stringify(this.state);
    // localStorage.setItem(storageName, strState);
    // } catch (err) {
    // throw err;
    // }
    // };

    // setNewState = (state) => {
    // this.setState({
    // ...state,
    // }, () => {
    // this.saveState();
    // });
    // };

    setTitle = (title) => {
        this.setState({
            title
    })
    // , () => {
        //this.saveState();
        // });
    }

    // setUserProfile = (identity) => {
    // return new Promise(resolve => {
    // this.setState({
    // identity,
    // }, () => {
    // this.saveState();
    // resolve(identity);
    // });
    // });
    // };

    render() {
        const { children } = this.props;

        return (
            <AppContext.Provider
                value={{
                    title: this.state.title,
                    // issueStatuses: this.state.issueStatuses,
                    setTitle: this.setTitle,
                    // salaryBands: this.state.salaryBands,
                    // setSalaryBands: this.setSalaryBands,
                    // initialState: this.initialState,
                    // setUserProfile: this.setUserProfile,
                    // userProfile: this.userProfile,
                    // isAuthenticated: this.isAuthenticated,
                    // saveState: this.saveState,
                    // setNewState: this.setNewState,
                    rawState: this.state,
                }}
            >
                {children}
            </AppContext.Provider>
        );
    }
}
