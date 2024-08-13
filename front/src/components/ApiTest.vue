<script>
// ...
  methods: {
    test() {
      fetch(`${process.env.VUE_APP_API_URL}/api/test`)
        .then((response) => response.json())
        .then((data) => {
          this.message = data.message;
        })
    }
  }
}
</script>
