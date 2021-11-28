<template>
  <div>
    <b-form @submit='onSubmit'>
      <div class='row'>
        <div class='col-md-12' v-if='error' style='margin-bottom: 10px'>
          <b-alert
            variant="warning"
            show
            dismissible
            @dismissed='error = false'>{{messageError}}</b-alert>
        </div>
        <div class='col-md-1'>
          <b-form-input type="color" v-model='form.color'/>
        </div>
        <div class='col-md-11'>
          <b-form-input
            v-model="form.title"
            type="text"
            placeholder="Add title"
            :maxlength='30'
            required
          />
        </div>
        <div class='col-md-12'>
          <hr>
        </div>
        <div class='col-md-4'>
          <b-form-datepicker
            :date-format-options="{ year: 'numeric', month: 'numeric', date: 'numeric' }"
            :min='min'
            placeholder="Choose a date"
            v-model="form.date"
            required
          />
        </div>
        <div class='col-md-3'>
          <b-form-timepicker
            v-model="form.time"
            locale="en"
            placeholder="Select a time"
            required
          />
        </div>
        <div class='col-md-6'>
          <b-input-group style='margin-top: 10px'>
            <b-input-group-text>
              <span><b-icon icon="geo-alt-fill" /></span>
            </b-input-group-text>
            <b-form-input
              v-model="form.city"
              type="text"
              placeholder="Add city"
            />
          </b-input-group>
        </div>
      </div>
      <div class='row' style='margin-top: 10px;border-top: 1px solid #dee2e6;'>
        <div class='col-md-12' style='display: flex;justify-content: flex-end;align-items: center; margin-top: 10px'>
          <b-button @click='reset' variant="secondary">Reset</b-button>
          <b-button type='submit' :variant="isEdit ? 'warning' : 'primary'" style='margin-left: 5px'>{{isEdit ? 'Edit' : 'Save'}}</b-button>
        </div>
      </div>
    </b-form>
  </div>
</template>

<script>
export default {
  name: 'reminderForm',
  data() {
    return {
      min:new Date(),
      error:false,
      messageError: "",
      form:{
        title: "",
        date: null,
        time: null,
        city: "",
        color: "#0d6efd"
      }
    }
  },
  computed:{
    selectReminder () {
      return this.$store.state.reminders.selectReminder
    },
    isEdit()
    {
      return !!this.selectReminder;
    }
  },
  methods:{
    reset()
    {
      this.form = {
        title: "",
        date: null,
        time: null,
        city: "",
        color: "#0d6efd"
      }

      this.messageError = ''
      this.error = false;
    },
    onSubmit(event){
      event.preventDefault()

      if (!this.form.date || !this.form.time)
      {
        this.messageError = 'some fields are missing'
        this.error = true;
        return;
      }

      // Validating that the entered time is after the current time
      let currentDate = this.$moment.utc(this.$moment().format("YYYY-MM-DDTHH:mm:ssZ"),'YYYY-MM-DD[T]HH:mm[Z]');
      let date_time = `${this.form.date}T${this.form.time}Z`
      this.form.dateTime = this.$moment.utc(date_time, 'YYYY-MM-DD[T]HH:mm[Z]');

      if (currentDate.isAfter(this.form.dateTime))
      {
        this.messageError = '!wrong time'
        this.error = true;
        return;
      }

      this.$store.commit(
        this.isEdit ? "reminders/EDIT_REMINDER" : "reminders/SET_REMINDER",
        Object.assign({}, this.form)
      );

      this.$store.commit("reminders/SET_SELECT_REMINDER", null);
      this.$bvModal.hide('reminderModalForm');
    }
  },
  created() {
    if (this.selectReminder){
      this.form.id = this.selectReminder.id;
      this.form.title = this.selectReminder.title;
      this.form.city = this.selectReminder.city;
      this.form.color = this.selectReminder.color;
      this.form.time = this.selectReminder.time;
      this.form.date = this.selectReminder.date;
    }
  }
};
</script>

<style scoped>

</style>