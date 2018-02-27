import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';

import DayPickerInput from 'react-day-picker/DayPickerInput';
import MomentLocaleUtils, { formatDate, parseDate } from 'react-day-picker/moment';
import 'react-day-picker/lib/style.css';

// DateSelector component - wrapper for the React DayPicker component
export default class DateSelector extends Component {
    render() {
        return (
            <DayPickerInput
                {...this.props}
                format='dddd, MMM Do'
                formatDate={formatDate}
                parseDate={parseDate}
            />
        )
    }
}