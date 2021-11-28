import { ReminderServices } from '@/services/ReminderServices';
import * as moment from 'moment';

export const RemindersModules = {
  namespaced: true,
  state:{
    reminders: [],
    selectReminder:null
  },
  mutations:{
    SET_REMINDER(state, data)
    {
      data.id = state.reminders.length === 0 ? 1 : Math.max(...state.reminders.map(item => item.id)) + 1;
      state.reminders.push(data);
    },
    SET_SELECT_REMINDER(state, data)
    {
      state.selectReminder = data;
    },
    EDIT_REMINDER(state, data)
    {
      let reminderIndex = state.reminders.findIndex((reminder => reminder.id === data.id));
      state.reminders[reminderIndex] = data;
    },
    DELETE_REMINDER(state, data)
    {
      let reminderIndex = state.reminders.findIndex((reminder => reminder.id === data.id));
      state.reminders.splice(reminderIndex, 1);
    },
  },
  actions:{
    async getWeatherOfReminder({commit}, reminder)
    {
      try {
        if (reminder.city){

          let isToday = moment(moment().format('YYYY-MM-D'), 'YYYY-MM-D');
          let reminderDay = moment(reminder.dateTime, 'YYYY-MM-D')

          // is the same day for search the forecast
          if(isToday.isSame(reminderDay, 'date')){
            const result = await ReminderServices.getWeatherOfCity(reminder.city);
            reminder.weather = result.weather[0].description;
          }

        }
      }catch (e) {
        console.log(e)
        reminder.weather = ''
      } finally {
        commit('EDIT_REMINDER', reminder);
        commit('SET_SELECT_REMINDER', reminder);
      }
    }
  }
}