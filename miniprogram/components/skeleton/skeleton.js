// components/skeleton/skeleton.js
Component({
  properties: {
    type: {
      type: String,
      value: 'card' // card, stat, list, quiz
    },
    count: {
      type: Number,
      value: 3
    }
  },

  data: {
  },

  lifetimes: {
    attached: function() {
    }
  },

  methods: {
  }
})
