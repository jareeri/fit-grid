import React from 'react'

const ReviewT = () => {
  return (
    <div>
      <>
  {/* HTML Structure */}
  <form className="max-w-md mx-auto mt-16 p-4 bg-white shadow rounded">
    <h2 className="text-2xl font-bold mb-4">Feedback Form</h2>
    <div className="mb-4">
      <label htmlFor="name" className="block mb-1">
        Name
      </label>
      <input
        type="text"
        id="name"
        className="w-full py-2 px-4 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
    <div className="mb-4">
      <label htmlFor="email" className="block mb-1">
        Email
      </label>
      <input
        type="email"
        id="email"
        className="w-full py-2 px-4 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
    <div className="mb-4">
      <label className="block mb-1">Rating</label>
      <div className="flex items-center space-x-2">
        <input
          type="radio"
          name="rating"
          id="rating1"
          defaultValue={1}
          className="focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <label htmlFor="rating1">1</label>
        <input
          type="radio"
          name="rating"
          id="rating2"
          defaultValue={2}
          className="focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <label htmlFor="rating2">2</label>
        <input
          type="radio"
          name="rating"
          id="rating3"
          defaultValue={3}
          className="focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <label htmlFor="rating3">3</label>
        <input
          type="radio"
          name="rating"
          id="rating4"
          defaultValue={4}
          className="focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <label htmlFor="rating4">4</label>
        <input
          type="radio"
          name="rating"
          id="rating5"
          defaultValue={5}
          className="focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <label htmlFor="rating5">5</label>
      </div>
    </div>
    <div className="mb-4">
      <label htmlFor="message" className="block mb-1">
        Message
      </label>
      <textarea
        id="message"
        className="w-full py-2 px-4 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        defaultValue={""}
      />
    </div>
    <button
      type="submit"
      className="py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
    >
      Submit
    </button>
  </form>
</>

    </div>
  )
}

export default ReviewT
