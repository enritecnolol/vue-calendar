<template>
  <div class="calendar">

    <div class="calendar__date">
      <span class="calendar__prev" @click="next(-1)">&#5176;</span>
      <h3 class="calendar__month">{{ currentMonth }}</h3>
      <span class="calendar__next" @click="next(1)">&#5171;</span>
    </div>

    <b-button
      class="calendar__btn"
      pill
      variant="primary"
      v-b-modal.reminderModalForm
    ><b-icon
      icon="calendar-plus"/> Create</b-button>

    <div class="calendar__header">
      <div v-for="day of daysWeek" :key="day" class="calendar__day">
        {{ day }}
      </div>
    </div>

    <div class="calendar__body">
      <Cell v-for="(day, i) of days" :key="'day_' + i" v-bind="day" @select="click">
        <Badge
          v-for="(item, i) of getRemindersByDay(day)"
          :key="`badge_${i}`"
          v-bind="item"
          @selectBadge='selectBadge(item)'
        />
      </Cell>
    </div>

    <Modal
      :id="'reminderModalForm'"
      title='Reminder'
      size='lg'
    >
      <Reminder-Form />
    </Modal>

    <Modal
      :id="'reminderShowModal'"
      title='Reminder info'
      size='lg'
      v-if='selectReminder'
      :hideHeaderClose='true'
    >
      <Reminder-Show />
    </Modal>

  </div>
</template>

<script>
export default {
  name: 'calendar',
  components: {
    Cell: () => import('./Cell'),
    Badge: () => import('./Badge'),
    Modal: () => import('@/components/modals'),
    ReminderForm: () => import('@/components/Forms/reminderForm'),
    ReminderShow: () => import('@/components/Forms/reminderShow')
  },
  data: () => ({
    select: null,
    date: null,
    month: 0,
    daysWeek: ['Sunday','Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
  }),
  computed: {

    currentMonth() {
      const year = this.date.year();
      const month = this.date.format('MMMM');
      return `${month} ${year !== this.$moment().year() ? year : ''}`;
    },

    days() {
      const monthStart = this.date.clone().startOf('month');
      const monthEnd = this.date.clone().endOf('month');
      const weekStart = monthStart.clone().startOf('week');
      return [...Array(monthEnd.diff(weekStart, 'days') >= 35 ? 42 : 35)].map((_, i) => {
        const day = weekStart.clone().add(i, 'day');
        const active = this.active(day);
        return { day, active, date: this.date };
      });
    },

    reminders () {
      return this.$store.state.reminders.reminders
    },

    selectReminder () {
      return this.$store.state.reminders.selectReminder
    }
  },
  methods: {
    async selectBadge(item)
    {
      await this.$store.dispatch("reminders/getWeatherOfReminder", item);
      this.$bvModal.show('reminderShowModal');
    },
    next(value) {
      this.date = this.date.add(value, 'month').clone();
    },
    active(day) {
      const select = this.select || this.$moment().clone();
      return select.isSame(day, 'day');
    },
    click(day) {
      const before = this.date.isBefore(day, 'month');
      const after = this.date.isAfter(day, 'month');
      if (after || before) {
        this.next(after ? -1 : 1);
      }
      this.select = day;
    },
    getRemindersByDay({ day }) {
      let sortByDay = this.reminders.filter((item) => item.dateTime.isSame(day, 'day'));
      return sortByDay.sort((a, b) => a.dateTime - b.dateTime)
    },
  },
  created() {
    this.date = this.$moment().clone();
  },
};
</script>

<style scoped lang="scss">
.calendar {
  width: 100%;
  min-height: 600px;
  border-radius: 20px;
  background-color: #ffffff;
  user-select: none;
  padding: 5px 5px 10px 5px;
  position: relative;
  &__date {
    display: flex;
    align-items: center;
    height: 50px;
    padding: 10px 20px;
    span {
      height: 25px;
      width: 25px;
      cursor: pointer;
      text-align: center;
    }
  }
  &__month {
    margin: 0 5px;
    min-width: 110px;
    text-align: center;
    text-transform: uppercase;
    color: #0d6efd;
  }
  &__header {
    margin-top: 15px;
    padding: 0 10px;
    display: grid;
    grid-template-columns: repeat(7, 1fr);
  }
  &__day {
    text-align: end;
  }

  &__body {
    background-color: #efefef;
    padding: 2px;
    margin: 10px;
    border-radius: 5px;
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    gap: 2px;
  }
  &__btn {
    position: absolute;
    font-size: 20px;
    top: 10px;
    right: 20px;
  }
}
</style>
