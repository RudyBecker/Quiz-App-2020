import App from "@/App.vue";
import {shallowMount} from "@vue/test-utils";

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