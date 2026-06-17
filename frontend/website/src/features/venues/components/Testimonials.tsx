export default function Testimonials() {

  const reviews = [
    {
      name: "Rahul Sharma",
      review:
        "Booked our wedding venue through BookMyVenue. The process was smooth and easy.",
      rating: 5,
    },

    {
      name: "Anjali Nair",
      review:
        "Great venue options and transparent pricing. Highly recommended.",
      rating: 5,
    },

    {
      name: "Arjun Kumar",
      review:
        "Found the perfect conference hall in minutes. Excellent experience.",
      rating: 4,
    },
  ];

  return (
    <section className="max-w-7xl mx-auto py-20 px-6">

      <h2 className="text-4xl font-bold text-center mb-12 text-[#1E120A]">
        What Our Customers Say
      </h2>

      <div className="overflow-x-hidden overflow-y-visible py-4">

        <div className="flex gap-6 animate-scroll">

          {[...reviews, ...reviews].map((review, index) => (

            <div
              key={index}
              className="
              min-w-[350px]
              bg-white
              p-6
              rounded-3xl
              border
              border-[#C8B49A]
              shadow-xl
              hover:shadow-2xl
              hover:scale-[1.02]
              hover:-translate-y-2
              transition-all
              duration-300
              cursor-pointer
              "
            >

              <p className="text-[#A07020] text-xl mb-4">
                {"★".repeat(review.rating)}
              </p>

              <p className="text-[#7A6050] mb-4">
                "{review.review}"
              </p>

              <h3 className="font-semibold text-[#1E120A]">
                {review.name}
              </h3>

            </div>

          ))}

        </div>

      </div>

    </section>
  );
}