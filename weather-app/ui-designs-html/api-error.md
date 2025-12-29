//what to display when there's an err fetching data

 <div class="flex flex-col items-center mt-5 gap-5 w-[40%]">
          <img src="./assets/images/icon-error.svg" class="w-8" />
          <p class="font-bold text-4xl font-bricolage">Something went wrong</p>
          <p class="text-center text-xs text-light-gray">
            We couldn't connect to the server (API error). Please try again in a
            few moments
          </p>
          <button
            class="flex items-center gap-2 bg-neutral700 border-0 rounded-md py-1 px-3 text-sm"
          >
            <img src="./assets/images/icon-retry.svg" class="w-3" />
            Retry
          </button>
        </div>
