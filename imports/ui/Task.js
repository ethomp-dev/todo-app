import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import classnames from 'classnames';

import { Tasks } from '../api/tasks.js';
import DateSelector from './DateSelector';

// Task component - represents a single todo item
export default class Task extends Component {
    toggleChecked() {
        Meteor.call('tasks.setChecked', this.props.task._id, !this.props.task.checked);
    }

    deleteThisTask() {
        Meteor.call('tasks.remove', this.props.task._id);
    }

    setDueDate = (day) => {
        Meteor.call('tasks.setDueDate', this.props.task._id, day);
    }

    togglePriority() {
        let nextPriority = 'Low';
        switch (this.props.task.priority) {
            case 'Low':
                nextPriority = 'Medium';
                break;
            case 'Medium':
                nextPriority = 'High';
                break;
        }

        Meteor.call('tasks.setPriority', this.props.task._id, nextPriority);
    }
    
    render() {
        const taskClassName = classnames({
            checked: this.props.task.checked,
            private: this.props.task.private,
        });
        
        return (
            <li className={taskClassName}>
                <button className="delete" onClick={this.deleteThisTask.bind(this)}>
                    &times;
                </button>

                <input
                    type="checkbox"
                    readOnly
                    checked={!!this.props.task.checked}
                    onClick={this.toggleChecked.bind(this)}
                />

                <button className={`toggle-priority ${this.props.task.priority}`} onClick={this.togglePriority.bind(this)}>
                    {this.props.task.priority}
                </button>

                <span className="text">
                    {this.props.task.text}
                </span>

                <DateSelector
                    placeholder='Due Date'
                    value={this.props.task.dueDate}
                    onDayChange={this.setDueDate}
                />
            </li>
        );
    }
}