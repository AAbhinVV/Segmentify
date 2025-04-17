import { ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

import { MaxWidthWrapper } from "@/components/max-width-wrapper";
import { buttonVariants } from "@/components/ui/button";

const HomePage = () => {
  return (
    <>
      <MaxWidthWrapper className="mb-16 mt-28 sm:mt-40 flex flex-col items-center justify-center text-center">
        <div className="mx-auto mb-4 flex max-w-fit items-center justify-center space-x-2 rounded-full border border-gray-200 bg-white/80 px-6 py-1.5 shadow backdrop-blur hover:border-gray-300 transition">
          <p className="text-sm font-medium text-gray-800">
             Segmentify is now public!
          </p>
        </div>

        <h1 className="max-w-4xl text-5xl font-extrabold tracking-tight md:text-6xl lg:text-7xl">
          Chat with your{" "}
          <span className="bg-gradient-to-r from-blue-600 to-indigo-500 bg-clip-text text-transparent">
            documents
          </span>{" "}
          in seconds.
        </h1>

        <p className="mt-6 max-w-xl text-zinc-700 sm:text-lg">
          Upload any PDF and start having intelligent, real-time conversations
          with it. Fast, intuitive, and private.
        </p>

        <Link
          href="/dashboard"
          target="_blank"
          className={buttonVariants({
            size: "lg",
            className: "mt-6 hover:scale-105 transition-transform",
          })}
        >
          Get started <ArrowRight className="ml-2 h-5 w-5" />
        </Link>
      </MaxWidthWrapper>

      {/* Preview Section */}
      <div className="relative isolate">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 -top-40 -z-10 transform-gpu blur-3xl sm:-top-80"
        >
          <div
            className="relative left-1/2 w-[36rem] sm:w-[72rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-pink-300 to-purple-400 opacity-30 aspect-[1155/678]"
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
          />
        </div>

        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <div className="mt-16 sm:mt-24">
            <div className="-m-2 rounded-xl bg-white p-2 shadow-2xl ring-1 ring-gray-200 lg:-m-4 lg:rounded-2xl lg:p-4">
              <Image
                src="/dashboard-preview.jpg"
                alt="product preview"
                width={1364}
                height={866}
                quality={100}
                className="rounded-md"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Steps Section */}
      <div className="mx-auto my-32 max-w-5xl px-6 sm:my-56 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-4xl font-bold text-gray-900 sm:text-5xl">
            Start chatting in minutes
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Chatting with your PDF files has never been easier than with
            Segmentify.
          </p>
        </div>

        <ol className="mt-12 space-y-8 md:flex md:space-x-8 md:space-y-0">
          <li className="md:flex-1">
            <div className="flex flex-col space-y-2 border-l-4 border-blue-200 py-2 pl-4 md:border-l-0 md:border-t-2 md:pt-4 md:pl-0">
              <span className="text-sm font-medium text-blue-600">Step 1</span>
              <span className="text-xl font-semibold text-gray-900">
                Sign up for an account
              </span>
              <span className="text-gray-700">
                Start with a free plan or try our{" "}
                <Link
                  href="/pricing"
                  className="text-blue-700 underline underline-offset-2"
                >
                  pro plan
                </Link>
                .
              </span>
            </div>
          </li>

          <li className="md:flex-1">
            <div className="flex flex-col space-y-2 border-l-4 border-blue-200 py-2 pl-4 md:border-l-0 md:border-t-2 md:pt-4 md:pl-0">
              <span className="text-sm font-medium text-blue-600">Step 2</span>
              <span className="text-xl font-semibold text-gray-900">
                Upload your PDF file
              </span>
              <span className="text-gray-700">
                We’ll process your file and make it ready for chat.
              </span>
            </div>
          </li>

          <li className="md:flex-1">
            <div className="flex flex-col space-y-2 border-l-4 border-blue-200 py-2 pl-4 md:border-l-0 md:border-t-2 md:pt-4 md:pl-0">
              <span className="text-sm font-medium text-blue-600">Step 3</span>
              <span className="text-xl font-semibold text-gray-900">
                Start asking questions
              </span>
              <span className="text-gray-700">
                It’s that simple. Try out Segmentify – it takes under a minute.
              </span>
            </div>
          </li>
        </ol>

        <div className="mt-20">
          <div className="-m-2 rounded-xl bg-white p-2 shadow-2xl ring-1 ring-gray-200 lg:-m-4 lg:rounded-2xl lg:p-4">
            <Image
              src="/file-upload-preview.jpg"
              alt="uploading preview"
              width={1419}
              height={732}
              quality={100}
              className="rounded-md"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
