document.addEventListener("alpine:init", () => {
  Alpine.data("usersData", () => ({
    mainUsers: [],
    users: [],
    pageUsers: [],
    itemsCount: 4,
    currentPage: 1,
    pageCount: 1,
    isLoading: false,
    showAddModal: false,
    searchChar: "",
    newUserInfo: {
      name: "",
      username: "",
      email: "",
      address: "",
    },
    getUsers() {
      this.isLoading = true;
      axios
        .get("https://jsonplaceholder.typicode.com/users")
        .then((res) => {
          console.log(res);
          this.users = res.data;
          this.mainUsers = res.data;
          this.pagination();
        })
        .finally(() => {
          this.isLoading = false;
        });
    },

    pagination() {
      this.pageCount = Math.ceil(this.users.length / this.itemsCount);
      let start = this.currentPage * this.itemsCount - this.itemsCount;
      let end = this.currentPage * this.itemsCount;
      this.pageUsers = this.users.slice(start, end);
    },

    nextPage() {
      this.currentPage++;
      if (this.currentPage > this.pageCount) {
        this.currentPage = this.pageCount;
      }

      this.pagination();
    },

    prevPage() {
      this.currentPage--;
      if (this.currentPage < 1) {
        this.currentPage = 1;
      }
      this.pagination();
    },

    handleChangeItemsCount(value) {
      this.currentPage = 1;
      if (value < 1) {
        this.itemsCount = 1;
      }
      if (value > this.users.length) {
        this.itemsCount = this.users.length;
      }
    },

    handleSearch(value) {
      this.users = this.mainUsers.filter(
        (user) =>
          user.name.includes(value) ||
          user.username.includes(value) ||
          user.email.includes(value)
      );
      this.currentPage = 1;
      this.pagination();
    },

    handleAddUserForm() {
      this.isLoading = true;
      axios
        .post("https://jsonplaceholder.typicode.com/users", this.newUserInfo)
        .then((res) => {
          if (res.status == 201) {
            this.mainUsers.push(this.newUserInfo);
            this.pagination();
            this.showAddModal = false;
            this.handleResetForm();
            M.toast({
              html: "کاربر با موفقیت ایجاد شد",
              classes: "rounded green",
            });
          }
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    handleResetForm() {
      this.newUserInfo = {
        name: "",
        username: "",
        email: "",
        address: "",
      };
    },
  }));
});
