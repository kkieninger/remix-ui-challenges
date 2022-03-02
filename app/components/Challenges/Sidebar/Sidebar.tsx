/* This example requires Tailwind CSS v2.0+ */
import { Fragment, useState } from "react";
import { useNavigate, Link, useOutletContext, useLoaderData, useLocation } from "remix";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, SelectorIcon } from "@heroicons/react/solid";

import type { Challenge } from "@prisma/client";
import classNames from "~/utils/classNames";

const Sidebar = ({ challenges }: { challenges: Challenge[] }) => {
  const [selected, setSelected] = useState<Challenge>(challenges[0])
  const navigate = useNavigate();
  const context = useOutletContext();
  const data = useLoaderData();
  const location = useLocation();

  const handleOnChange = (challenge: Challenge) => {
    setSelected(challenge);
    navigate(`./${challenge.id}`, { replace: true });
  };

  return (
    <div>
      <Link
        to="."
        className="bg-transparent hover:bg-slate-900 text-slate-100 font-semibold py-3 px-4 border border-slate-100 hover:border-transparent rounded mb-3 block text-center transition ease-in"
      >
        new random challenge
      </Link>
      <Listbox
        value={challenges[0]}
        onChange={(challenge) => handleOnChange(challenge)}
      >
        {({ open }) => (
          <>
            <div className="mt-1 relative">
              <Listbox.Button className="relative lowercase w-full bg-white border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                <span className="flex items-center">
                  <span className="rounded-full h-8 w-8 flex-shrink-0 bg-slate-700 text-white text-xs flex items-center justify-center font-medium">{`${selected.timeAllotted / 60}m`}</span>
                  <span className="ml-3 block truncate text-slate-900">{selected?.title}</span>
                </span>
                <span className="ml-3 absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                  <SelectorIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                </span>
              </Listbox.Button>

              <Transition
                show={open}
                as={Fragment}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Listbox.Options className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-56 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
                  {challenges.map((challenge) => (
                    <Listbox.Option
                      key={challenge.id}
                      className={({ active }) =>
                        classNames(
                          active ? 'text-white bg-indigo-600' : 'text-gray-900',
                          'cursor-default select-none relative py-2 pl-3 pr-9'
                        )
                      }
                      value={challenge}
                    >
                      {({ selected, active }) => (
                        <>
                          <div className="flex items-center">
                            <span className="rounded-full h-8 w-8 flex-shrink-0 bg-slate-700 text-xs flex items-center justify-center font-medium text-white">{`${challenge.timeAllotted / 60}m`}</span>
                            <span
                              className={classNames(selected ? 'font-semibold' : 'font-normal', 'ml-3 block truncate')}
                            >
                              {challenge.title}
                            </span>
                          </div>

                          {selected ? (
                            <span
                              className={classNames(
                                active ? 'text-white' : 'text-indigo-600',
                                'absolute inset-y-0 right-0 flex items-center pr-4'
                              )}
                            >
                              <CheckIcon className="h-5 w-5" aria-hidden="true" />
                            </span>
                          ) : null}
                        </>
                      )}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </Transition>
            </div>
          </>
        )}
      </Listbox>
    </div>
  )
}

export default Sidebar;
