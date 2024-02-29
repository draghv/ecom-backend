function handleFormSubmit(event) {
  event.preventDefault();
  const userDetails = {
    price: event.target.price.value,
    name: event.target.name.value,
  };

  axios
    .post(
      "https://crudcrud.com/api/7c71225b67c64938820066c39b77f36c/app",
      userDetails
    )
    .then((response) => console.log("pass"))
    .catch((error) => console.log(error));

  setTimeout(() => {
    axios
      .get(
        "https://crudcrud.com/api/7c71225b67c64938820066c39b77f36c/app",
        userDetails
      )
      .then((res) => {
        console.log(res);
        for (let i = 0; i < res.data.length; i++) {
          displayUserOnScreen(res.data[i]);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, 1000);

  // Clearing the input fields
  document.getElementById("price").value = "";
  document.getElementById("name").value = "";
  //   document.getElementById("phone").value = "";
}

function displayUserOnScreen(userDetails) {
  console.log(userDetails);
  const userItem = document.createElement("li");
  userItem.appendChild(
    document.createTextNode(`${userDetails.price} - ${userDetails.name} `)
  );

  const deleteBtn = document.createElement("button");
  deleteBtn.appendChild(document.createTextNode("Delete"));
  userItem.appendChild(deleteBtn);

  const userList = document.querySelector("ul");
  userList.appendChild(userItem);

  const delId = userDetails._id;
  deleteBtn.addEventListener("click", function (event) {
    // localStorage.removeItem(userDetails.email);
    axios
      .delete(
        "https://crudcrud.com/api/7c71225b67c64938820066c39b77f36c/app/" + delId
      )
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
    userList.removeChild(event.target.parentElement);
  });
}

// Do not touch code below
module.exports = handleFormSubmit;
module.exports = displayUserOnScreen;
