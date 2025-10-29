import AuthPageLayout from "../../components/AuthPageLayout"

const SuccessPage = () => {

  return (
    <AuthPageLayout
      backButton={true}
      footer={<p>By using Scholifi, you agree to the{" "}
        <a href="#" className=" hover:text-gray-700">
          Terms
        </a>
        and
        <a href="#" className=" hover:text-gray-700">
          Privacy Policy
        </a>
        .
      </p>}
    >
        {/* Success Icon */}
        <div className="mt-20 mb-8">
          <div className="relative w-24 h-24 mx-auto">
            {/* Flower petals background */}
            <div className="absolute inset-0 flex items-center justify-center">
              {/* Top petal */}
              <div className="absolute top-0 left-0 w-14 h-14 bg-purple-200 rounded-full" />
              {/* Right petal */}
              <div className="absolute right-0 top-0 w-14 h-14 bg-purple-200 rounded-full" />
              {/* Bottom petal */}
              <div className="absolute bottom-0 right-0 w-14 h-14 bg-purple-200 rounded-full" />
              {/* Left petal */}
              <div className="absolute left-0 bottom-0 w-14 h-14 bg-purple-200 rounded-full" />
              {/* Center circle with checkmark */}
              <div className="relative w-16 h-16 rounded-full flex items-center justify-center">
                <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Success Message */}
        <h1 className="text-center text-gray-900 mb-3">Your account was successfully created!</h1>
        <p className="text-sm text-center text-gray-600 mb-8">Only one click to explore online education.</p>

    </AuthPageLayout>
  )
}

export default SuccessPage
