/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */

import React, { useState, useEffect } from 'react';
import { View, Button, TextInput, Text } from 'react-native';
import notifee, { EventType, TriggerType, RepeatFrequency } from '@notifee/react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

export default function Medication({ navigation }) {
  const [medicationName, setMedicationName] = useState('');
  const [reminderTimes, setReminderTimes] = useState([]);
  const [selectedTime, setSelectedTime] = useState(new Date());
  const [reminderDays, setReminderDays] = useState([]);
  const [isTimePickerVisible, setTimePickerVisible] = useState(false);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [isStartDatePickerVisible, setStartDatePickerVisible] = useState(false);
  const [isEndDatePickerVisible, setEndDatePickerVisible] = useState(false);

  useEffect(() => {
    const unsubscribeForegroundEvent = notifee.onForegroundEvent(({ type, detail }) => {
      if (type === EventType.PRESS) {
        // Handle notification press event here
        console.log('Notification pressed:', detail.notification);
      }
    });

    return () => {
      unsubscribeForegroundEvent();
    };
  }, []);

  const createTriggerNotification = async () => {
    if (!startDate || !endDate) {
      // Validate that start and end dates are selected
      console.log('Please select start and end dates');
      return;
    }
    if (reminderTimes.length === 0) {
      // Validate that at least one reminder time is selected
      console.log('Please select at least one reminder time');
      return;
    }
    const triggers = [];
    for (const time of reminderTimes) {
      for (const day of reminderDays) {
        const triggerDate = new Date(startDate);
        triggerDate.setHours(time.getHours());
        triggerDate.setMinutes(time.getMinutes());
        triggerDate.setDate(triggerDate.getDate() + day);

        if (triggerDate <= endDate) {
          const trigger = {
            type: TriggerType.TIMESTAMP,
            timestamp: triggerDate.getTime(),
            start: startDate.getTime(),
            end: endDate.getTime(),
            repeatFrequency: RepeatFrequency.DAILY,
            repeatInterval: 1,
            repeatDays: [day],
          };
          triggers.push(trigger);
        }
      }
    }

    for (const trigger of triggers) {
      await notifee.createTriggerNotification(
        {
          title: 'Medication Reminder',
          body: `Time to take your ${medicationName}`,
          android: {
            channelId: 'medication',
          },
        },
        trigger
      );
    }
  };

  const showTimePicker = () => {
    setTimePickerVisible(true);
  };

  const hideTimePicker = () => {
    setTimePickerVisible(false);
  };

  const handleTimeConfirm = (event, selected) => {
    if (selected && event.type === 'set') {
      const reminderTime = new Date();
      reminderTime.setHours(selected.getHours());
      reminderTime.setMinutes(selected.getMinutes());

      setReminderTimes(prevTimes => [...prevTimes, reminderTime]);
      hideTimePicker();
    }
  };

  const removeReminderTime = index => {
    setReminderTimes(prevTimes => prevTimes.filter((_, i) => i !== index));
  };

  const showStartDatePicker = () => {
    setStartDatePickerVisible(true);
  };

  const hideStartDatePicker = () => {
    setStartDatePickerVisible(false);
  };

  const handleStartDateConfirm = (event, selected) => {
    if (selected && event.type === 'set') {
      setStartDate(selected);
    }
    hideStartDatePicker();
  };

  const showEndDatePicker = () => {
    setEndDatePickerVisible(true);
  };

  const hideEndDatePicker = () => {
    setEndDatePickerVisible(false);
  };

  const handleEndDateConfirm = (event, selected) => {
    if (selected && event.type === 'set') {
      setEndDate(selected);
    }
    hideEndDatePicker();
  };

  return (
    <View>
      <TextInput
        placeholder="Medication Name"
        value={medicationName}
        onChangeText={text => setMedicationName(text)}
      />
      <Button title="Select Start Date" onPress={showStartDatePicker} />
      {isStartDatePickerVisible && (
        <DateTimePicker
          value={startDate || new Date()}
          mode="date"
          display="spinner"
          onChange={handleStartDateConfirm}
        />
      )}
      <Button title="Select End Date" onPress={showEndDatePicker} />
      {isEndDatePickerVisible && (
        <DateTimePicker
          value={endDate || new Date()}
          mode="date"
          display="spinner"
          onChange={handleEndDateConfirm}
        />
      )}
      <View style={{ marginVertical: 10 }}>
        <Text>Reminder Times:</Text>
        {reminderTimes.map((time, index) => (
          <View key={index} style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text>{time.toLocaleTimeString()}</Text>
            <Button title="Remove" onPress={() => removeReminderTime(index)} />
          </View>
        ))}
      </View>
      <Button title="Add Reminder Time" onPress={showTimePicker} />
      <Button title="Create Trigger Notification" onPress={createTriggerNotification} />
    </View>
  );
}
