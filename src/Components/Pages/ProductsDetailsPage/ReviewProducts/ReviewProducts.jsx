import React from "react";
import Swal from "sweetalert2";
import useAuthContext from "../../../../hooks/useAuthContext";
import useAxiosPublick from "../../../../hooks/useAxiosPublick";
import { useQuery } from "@tanstack/react-query";
import { useLoaderData } from "react-router-dom";
import Slider from "react-slick";

// Next এবং Prev Arrow কাস্টমাইজ করার জন্য কম্পোনেন্ট
const CustomNextArrow = (props) => {
  const { className, onClick } = props;
  return (
    <div
      className={`${className} cursor-pointer text-blue-600`}
      onClick={onClick}
    />
  );
};

const CustomPrevArrow = (props) => {
  const { className, onClick } = props;
  return (
    <div
      className={`${className} cursor-pointer text-blue-600`}
      onClick={onClick}
    />
  );
};

const ReviewProducts = () => {
  const { user } = useAuthContext();
  const axiosPublic = useAxiosPublick();
  const product = useLoaderData();
  const productId = product?._id;

  // রিভিউ ফেচ করার জন্য useQuery
  const {
    data: reviews = [],
    refetch,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["reviews", productId],
    queryFn: () => axiosPublic.get(`/review/${productId}`).then((res) => res.data),
    enabled: !!productId,
  });

  const handleOnSubmit = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const rating = e.target.rating.value;
    const des = e.target.des.value;
    const userImage = user?.photoURL || "";
    const productName = product?.name || "";
    const dataInfo = { name, email, productId, productName, rating, des, userImage };

    axiosPublic
      .post("/review", dataInfo)
      .then((res) => {
        if (res.data.insertedId) {
          Swal.fire({
            title: "Review Added Successfully",
            text: "Your review has been submitted.",
            icon: "success",
            confirmButtonColor: "#3085d6",
            confirmButtonText: "OK",
          });
          e.target.reset();
          refetch(); // নতুন রিভিউ যোগ হলে রিফ্রেশ হবে
        }
      })
      .catch(() => {
        Swal.fire({
          title: "Error",
          text: "Failed to submit review. Please try again.",
          icon: "error",
          confirmButtonColor: "#d33",
          confirmButtonText: "OK",
        });
      });
  };

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    nextArrow: <CustomNextArrow />,
    prevArrow: <CustomPrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 3 },
      },
      {
        breakpoint: 768,
        settings: { slidesToShow: 2 },
      },
      {
        breakpoint: 480,
        settings: { slidesToShow: 1 },
      },
    ],
  };

  if (isLoading) return <p>Loading reviews...</p>;
  if (isError) return <p className="text-red-600">Failed to load reviews.</p>;

  return (
    <div className="shadow-md rounded-lg p-6 mt-10">
      <h2 className="text-2xl font-bold mb-4">Leave a Review</h2>
      <form onSubmit={handleOnSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          defaultValue={user?.displayName || ""}
          disabled
          className="w-full p-2 border rounded-md bg-white text-gray-800 dark:bg-gray-800 dark:text-gray-200 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Your Email"
          defaultValue={user?.email || ""}
          disabled
          className="w-full p-2 border rounded-md bg-white text-gray-800 dark:bg-gray-800 dark:text-gray-200 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        />
        <select
          name="rating"
          required
          defaultValue=""
          className="w-full p-2 border rounded-md bg-white text-gray-800 dark:bg-gray-800 dark:text-gray-200 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <option value="" disabled>
            Select Rating
          </option>
          <option value="1">⭐☆☆☆☆ (1)</option>
          <option value="2">⭐⭐☆☆☆ (2)</option>
          <option value="3">⭐⭐⭐☆☆ (3)</option>
          <option value="4">⭐⭐⭐⭐☆ (4)</option>
          <option value="5">⭐⭐⭐⭐⭐ (5)</option>
        </select>
        <textarea
          name="des"
          placeholder="Write your review..."
          required
          className="w-full p-2 border rounded-md bg-white text-gray-800 dark:bg-gray-800 dark:text-gray-200 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
        ></textarea>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition dark:bg-blue-600 dark:hover:bg-blue-700"
        >
          Submit Review
        </button>
      </form>


      {/* ইউজার রিভিউ লিস্ট */}
      <div className="mt-8">
        <h3 className="text-xl font-semibold mb-4">User Reviews</h3>
        {reviews.length > 0 ? (
          <Slider {...settings}>
            {reviews.map((review) => (
              <div
                key={review._id}
                className="border p-4  rounded-md shadow-sm "
              >
                <h4 className="font-bold">{review.name}</h4>
                <p className="text-sm ">{review.email}</p>
                <p className="text-yellow-500">{`⭐`.repeat(review.rating)}</p>
                <p className="mt-2">{review.des}</p>
              </div>
            ))}
          </Slider>
        ) : (
          <p className="">No reviews yet.</p>
        )}
      </div>
    </div>
  );
};

export default ReviewProducts;
