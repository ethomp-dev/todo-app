import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Tasks = new Mongo.Collection('tasks');

if (Meteor.isServer) {
    // This code only runs on the server
    // Only publish tasks that are public or belong to the current user
    Meteor.publish('tasks', function tasksPublication() {
        return Tasks.find({
            $or: [
                { private: { $ne: true } },
            ],
        });
    });
}

Meteor.methods({
    'tasks.insert'(text) {
        check(text, String);

        Tasks.insert({
            text,
            createdAt: new Date(),
            priority: 'Low',
            dueDate: undefined
        });
    },
    'tasks.remove'(taskId) {
        check(taskId, String);

        Tasks.remove(taskId);
    },
    'tasks.setChecked'(taskId, setChecked) {
        check(taskId, String);
        check(setChecked, Boolean);

        Tasks.update(taskId, { $set: { checked: setChecked } });
    },
    'tasks.setPriority'(taskId, priority) {
        check(taskId, String);
        check(priority, String);

        Tasks.update(taskId, { $set: { priority: priority } });
    },
    'tasks.setDueDate'(taskId, date) {
        check(taskId, String);
        check(date, Date);

        Tasks.update(taskId, { $set: { dueDate: date } });
    },
    'tasks.setPrivate'(taskId, setToPrivate) {
        check(taskId, String);
        check(setToPrivate, Boolean);

        Tasks.update(taskId, { $set: { private: setToPrivate } });
    },
});