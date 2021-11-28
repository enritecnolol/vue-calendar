import { createLocalVue, shallowMount } from '@vue/test-utils';
import ReminderForm from "@/components/Forms/reminderForm";
import { RemindersModules } from '@/store/modules/Reminders';
import Vuex from 'vuex';

const Vue = createLocalVue();
Vue.use(Vuex);

describe("ReminderForm", () => {
  let store;

  beforeEach(() => {
    store = new Vuex.Store({
      modules:{
        reminders: RemindersModules
      }
    });
  })

  const factory = (values = {}) => {
    return shallowMount(ReminderForm, {
      store,
      Vue,
      data() {
        return { ...values }
      }
    })
  }

  it("shows error message if there are missing fields", () => {

    const wrapper = factory({
      form:{
        title: "testing 1",
        date: null,
        time: null,
        city: "puerto plata",
        color: "#0d6efd"
      }
    });

    wrapper.vm.onSubmit();

    expect(wrapper.vm.error).toBe(true);
  });

  it("adding new reminder", () => {

    const wrapper = factory({
      form:{
        title: "testing 1",
        date: "2022-11-28",
        time: "10:00:00",
        city: "puerto plata",
        color: "#0d6efd"
      }
    });

    wrapper.vm.onSubmit();

    expect(wrapper.vm.error).toBe(true);
  });

});
