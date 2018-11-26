new Vue({
    el: '#app',
    data: {
        message: "This is a sample message for you"
    },
    created() {
        console.log(this.message);
    }
})