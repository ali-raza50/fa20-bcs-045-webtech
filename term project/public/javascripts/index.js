// // // // Add a click event listener to each star icon
// // // $(".staricon i").on("click", function () {
// // //   const rating = parseInt($(this).attr("data-rating"));
// // //   console.log(rating);
// // //   // Send an AJAX request to update the rating in the database
// // //   updateRatingInDatabase(rating);
// // // });

// // // // Function to send an AJAX request to update the rating in the database
// // // function updateRatingInDatabase(rating) {
// // //   // Send an HTTP request to your server-side endpoint with the rating value
// // //   // Replace '/update-rating' with your actual server-side route
// // //   $.ajax({
// // //     url: "/update-rating",
// // //     method: "POST",
// // //     contentType: "application/json",
// // //     data: JSON.stringify({ rating: rating }),
// // //     success: function () {
// // //       // Rating updated successfully
// // //       console.log("Rating updated in the database");
// // //     },
// // //     error: function () {
// // //       // Error occurred while updating the rating
// // //       console.log("Error updating rating in the database");
// // //     },
// // //   });
// // // }
// // // Get all the star icons
// // const starIcons = document.querySelectorAll(".staricon i");

// // // Add a click event listener to each star icon
// // starIcons.forEach((starIcon) => {
// //   starIcon.addEventListener("click", function () {
// //     const rating = parseInt(this.getAttribute("data-rating"));

// //     // Send an AJAX request to update the rating in the database
// //     updateRatingInDatabase(rating);
// //   });
// // });

// // // Function to send an AJAX request to update the rating in the database
// // function updateRatingInDatabase(rating) {
// //   // Send an HTTP request to your server-side endpoint with the rating value
// //   // Replace '/update-rating' with your actual server-side route
// //   fetch("/update-rating", {
// //     method: "POST",
// //     headers: {
// //       "Content-Type": "application/json",
// //     },
// //     body: JSON.stringify({ rating: rating }),
// //   })
// //     .then((response) => {
// //       if (response.ok) {
// //         // Rating updated successfully
// //         console.log("Rating updated in the database");
// //       } else {
// //         // Error occurred while updating the rating
// //         console.log("Error updating rating in the database");
// //       }
// //     })
// //     .catch((error) => {
// //       // Handle any network or server-side errors
// //       console.log("Error updating rating:", error);
// //     });
// // }

// const rating = 2; // Replace with your rating value

// fetch("/updaterRating", {
//   method: "POST",
//   headers: {
//     "Content-Type": "application/json",
//   },
//   body: JSON.stringify({ rating }),
// })
//   .then((response) => response.json())
//   .then((data) => {
//     console.log(data.message);
//   })
//   .catch((error) => {
//     console.error("Error h is mey:", error);
//   });
