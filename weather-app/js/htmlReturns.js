import * as icons from "./icons";

export function displayWeatherContainer(markup) {
  return `
    <div class="">
            <div class="grid grid-rows-[256px_112px] gap-8">
              ${markup}
              <div class="grid grid-cols-2 md:grid-cols-4 h-10 gap-6 weather-conditions">
                <div
                  class="bg-neutral800 p-5 border border-bluish-gray rounded-xl space-y-3"
                >
                  <p class="text-light-gray">Feels Like</p>
                  <p class="text-3xl">-</p>
                </div>
                <div
                  class="bg-neutral800 p-5 border border-bluish-gray rounded-xl space-y-3"
                >
                  <p class="text-light-gray">Humidity</p>
                  <p class="text-3xl">-</p>
                </div>
                <div
                  class="bg-neutral800 p-5 border border-bluish-gray rounded-xl space-y-3"
                >
                  <p class="text-light-gray">Wind</p>
                  <p class="text-3xl">-</p>
                </div>
                <div
                  class="bg-neutral800 p-5 border border-bluish-gray rounded-xl space-y-3"
                >
                  <p class="text-light-gray">Precipitation</p>
                  <p class="text-3xl">-</p>
                </div>
              </div>
            </div>

            <div class="mt-44 md:mt-14 space-y-4">
              <p class="font-bold text-lg">Daily forecast</p>
              <div class="grid grid-cols-3 lg:grid-cols-7 gap-4 daily-forecast-container">
                <div
                  class="bg-neutral800 border border-bluish-gray rounded-xl space-y-3 flex flex-col items-center py-3 px-3"
                ></div>
                <div
                  class="bg-neutral800 border border-bluish-gray rounded-xl space-y-3 flex flex-col items-center py-3 px-3 h-[153px]"
                ></div>
                <div
                  class="bg-neutral800 border border-bluish-gray rounded-xl space-y-3 flex flex-col items-center py-3 px-3 h-[153px]"
                ></div>
                <div
                  class="bg-neutral800 border border-bluish-gray rounded-xl space-y-3 flex flex-col items-center py-3 px-3 h-[153px]"
                ></div>
                <div
                  class="bg-neutral800 border border-bluish-gray rounded-xl space-y-3 flex flex-col items-center py-3 px-3 h-[153px]"
                ></div>
                <div
                  class="bg-neutral800 border border-bluish-gray rounded-xl space-y-3 flex flex-col items-center py-3 px-3 h-[153px]"
                ></div>
                <div
                  class="bg-neutral800 border border-bluish-gray rounded-xl space-y-3 flex flex-col items-center py-3 px-3 h-[153px]"
                ></div>
              </div>
            </div>
          </div>
          <div
            class="border-0 rounded-3xl bg-neutral800 flex flex-col items-center py-4 px-5 gap-3"
          >
            <div class="flex items-center justify-between w-full">
              <p class="font-bold text-lg">Hourly forecast</p>
              <div class="dropdown dropdown-hover dropdown-bottom dropdown-end">
                <div
                  tabindex="0"
                  role="button"
                  class="btn m-1 bg-bluish-gray px-4 border-0 rounded-lg shadow-none"
                >
                  <div class="flex gap-3 items-center">
                    <p class = 'selected-day'>-</p>
                    <img
                      src=${icons.dropdown}
                      alt="dropdown-icon"
                    />
                  </div>
                </div>
                <ul
                  tabindex="-1"
                  class="dropdown-content menu bg-neutral800 rounded-box z-1 w-52 p-2 shadow-sm border border-bluish-gray [&_a]:font-bold  weekdays-container "
              >
                  <li><a>Monday</a></li>
                  <li><a>Tuesday</a></li>
                  <li><a>Wednesday</a></li>
                  <li><a>Thursday</a></li>
                  <li><a>Friday</a></li>
                  <li><a>Saturday</a></li>
                  <li><a>Sunday</a></li>
                </ul>
              </div>
            </div>

            <div class="w-full space-y-3 hourly-forecast-container">
              <div
              class="bg-bluish-gray border border-bluish-gray rounded-lg flex justify-between items-center w-full py-2 px-3 h-[57px]"
            ></div>
            <div
              class="bg-bluish-gray border border-bluish-gray rounded-lg flex justify-between items-center w-full py-2 px-3 h-[57px]"
            ></div>
            <div
              class="bg-bluish-gray border border-bluish-gray rounded-lg flex justify-between items-center w-full py-2 px-3 h-[57px]"
            ></div>
            <div
              class="bg-bluish-gray border border-bluish-gray rounded-lg flex justify-between items-center w-full py-2 px-3 h-[57px]"
            ></div>
            <div
              class="bg-bluish-gray border border-bluish-gray rounded-lg flex justify-between items-center w-full py-2 px-3 h-[57px]"
            ></div>
            <div
              class="bg-bluish-gray border border-bluish-gray rounded-lg flex justify-between items-center w-full py-2 px-3 h-[57px]"
            ></div>
            <div
              class="bg-bluish-gray border border-bluish-gray rounded-lg flex justify-between items-center w-full py-2 px-3 h-[57px]"
            ></div>
            <div
              class="bg-bluish-gray border border-bluish-gray rounded-lg flex justify-between items-center w-full py-2 px-3 h-[57px]"
            ></div>
            <div
              class="bg-bluish-gray border border-bluish-gray rounded-lg flex justify-between items-center w-full py-2 px-3 h-[57px]"
            ></div>
            </div>
          
          </div>
    `;
}
