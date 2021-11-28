<template>
  <div>
    <div class='row'>
      <div class='col-md-12'>
        <p><b style='font-size: 18px'>Title:</b> {{selectReminder.title}}</p>
      </div>
      <div class='col-md-6'>
        <p><b style='font-size: 18px'>Date:</b> {{selectReminder.dateTime.format('MMMM Do YYYY, h:mm:ss a')}}</p>
      </div>
      <div class='col-md-4'>
        <p><b style='font-size: 18px'>City:</b>  {{selectReminder.city ? selectReminder.city :  "no city"}}</p>
      </div>
      <div class='col-md-4'>
        <p><b style='font-size: 18px'>Weather:</b> {{ selectReminder.weather !== "" ? selectReminder.weather : "not available" }}</p>
      </div>
    </div>
    <div class='row' style='margin-top: 10px;border-top: 1px solid #dee2e6;'>
      <div class='col-md-12' style='display: flex;justify-content: flex-end;align-items: center; margin-top: 10px'>
        <b-button @click='cleanSelectReminder' variant="secondary">Close</b-button>
        <b-button @click='deleteReminder' variant="danger" style='margin-left: 5px'><b-icon icon='x' /> Delete</b-button>
        <b-button @click='openModalForEditReminder' variant="warning" style='margin-left: 5px'><b-icon icon='pencil' /> Edit</b-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'reminderShow',
  methods:{
    cleanSelectReminder()
    {
      this.$store.commit("reminders/SET_SELECT_REMINDER", null);
      this.$bvModal.hide('reminderShowModal');
    },
    openModalForEditReminder()
    {
      this.$bvModal.hide('reminderShowModal');
      this.$bvModal.show('reminderModalForm');
    },
    deleteReminder()
    {
      if (!confirm("are you sure to delete this reminder?"))
        return

      this.$store.commit("reminders/DELETE_REMINDER", this.selectReminder);
      this.$store.commit("reminders/SET_SELECT_REMINDER", null);
      this.$bvModal.hide('reminderShowModal');
    }
  },
  computed:{
    selectReminder () {
      return this.$store.state.reminders.selectReminder
    }
  }
};
</script>

<style scoped>

</style>