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
      id: 0,
      name: "",
      username: "",
      email: "",
      address: "",
    },
    userIdToEdit: null,
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
            this.newUserInfo.id = res.data.id;
            this.mainUsers.push(this.newUserInfo);
            this.pagination();
            this.showAddModal = false;
            this.handleResetForm();
            M.toast({
              html: "Create User Successfully",
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
    handleDeleteUser(user) {
      var toastHTML = `<span>Are You Sure To Delete ${user.name}</span><button class="btn-flat toast-action" x-on:click="handleConfirmDelete(${user.id})">Delete</button>`;
      M.toast({ html: toastHTML });
    },
    handleConfirmDelete(userId) {
      this.isLoading = true;
      axios
        .delete("https://jsonplaceholder.typicode.com/users/" + userId)
        .then((res) => {
          if (res.status == 200) {
            this.mainUsers = this.mainUsers.filter((user) => user.id != userId);
            this.users = this.mainUsers;
            this.pagination();
            M.toast({
              html: "User Deleted Successfully",
              classes: "green",
            });
          }
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    handleUpdateUser(user) {
      axios
        .get("https://jsonplaceholder.typicode.com/users/" + user.id)
        .then((res) => {
          if (res.status == 200) {
            this.newUserInfo = {
              name: res.data.name,
              username: res.data.username,
              email: res.data.email,
              address: res.data.address.city,
            };
            this.showAddModal = true;
            this.userIdToEdit = res.data.id;
          }
        });
    },
    handleConfirmEditUser() {
      axios
        .put(
          "https://jsonplaceholder.typicode.com/users/" + this.userIdToEdit,
          this.newUserInfo
        )
        .then((res) => {
          if (res.status == 200) {
            let userIndex = this.mainUsers.findIndex(
              (user) => user.id == this.userIdToEdit
            );
            this.mainUsers[userIndex] = res.data;
            this.handleResetForm();
            this.showAddModal = false;
            this.pagination();
            this.userIdToEdit = null;
            M.toast({
              html: "User Updated Successfully",
              classes: "green",
            });
          }
        });
    },
  }));
});
