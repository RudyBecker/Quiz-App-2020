import App from "@/App.vue";
import {shallowMount, mount} from "@vue/test-utils";

describe("App.vue", () =>{
    let wrapper;
    beforeEach(()=>{
        wrapper = shallowMount(App, {
            methods: { selectAnswer: () =>{}}
        })
    })

    it("renders", () => {
        expect(wrapper.exists()).toBe(true);
    })

    it("does logo img exist", ()=> {
        expect(wrapper.find("img")).toEqual({"selector": "img"});
    })
})

describe("App.vue", () => {
  it('renders a div', () => {
    const wrapper = shallowMount(App)
    expect(wrapper.contains('div')).toBe(true)
  })
})


