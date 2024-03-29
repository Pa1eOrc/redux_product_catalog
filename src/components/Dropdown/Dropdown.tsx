import classNames from "classnames";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { getSearchWith } from "../../helpers/utils/getSearchWith";
import { DropdownIterface } from "../../type/Dropdown";
import { setCurrentOption } from "../../helpers/utils/functions";

import "./Dropdown.scss";

type Props = {
  dropdown: DropdownIterface;
  currentValue: string;
  queryKey: string;
  name: string;
};

export const Dropdown: React.FC<Props> = ({
  dropdown,
  currentValue,
  queryKey,
  name: title,
}) => {
  const { options, isOpen } = dropdown;
  const [isOpenState, setIsOpenState] = useState(isOpen);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [searchParams] = useSearchParams();
  const selectedOption = setCurrentOption(options, currentValue);

  // useEffect(() => {
  //   const handleClickOutside = (event: MouseEvent) => {
  //     if (
  //       dropdownRef.current &&
  //       !dropdownRef.current.contains(event.target as Node)
  //     ) {
  //       setIsOpenState(false);
  //     }
  //   };

  //   if (isOpenState) {
  //     document.addEventListener("click", handleClickOutside);
  //   } else {
  //     document.removeEventListener("click", handleClickOutside);
  //   }
  // }, [isOpenState]);

  const handleClickOutside = useCallback((event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsOpenState(false);
    }
  }, []);

  useEffect(() => {
    if (isOpenState) {
      document.addEventListener("click", handleClickOutside);
    } else {
      document.removeEventListener("click", handleClickOutside);
    }
  }, [isOpenState, handleClickOutside]);

  const handleDropdownToggle = () => {
    setIsOpenState(!isOpenState);
  };

  const handleClick = () => {
    setIsOpenState(false);
  };

  return (
    <div
      ref={dropdownRef}
      className={classNames("dropdown", { "dropdown--active": isOpenState })}
    >
      <p className="text text--small text--gray">{title}</p>

      <button
        type="button"
        className={`
          dropdown__trigger
          dropdown__trigger--${queryKey}`}
        onClick={handleDropdownToggle}
      >
        {selectedOption}

        <span
          className={classNames("icon", "icon--arrow-dis", {
            "icon--down": !isOpenState,
          })}
        />
      </button>

      <div className="dropdown__content">
        <ul className="dropdown__list">
          {Object.entries(options).map((option) => {
            const [key, value] = option;

            return (
              <li key={value} className="dropdown__item">
                <Link
                  to={{
                    search: getSearchWith(searchParams, { [queryKey]: value }),
                  }}
                  className={classNames("dropdown__link", {
                    "dropdown__link--selected": value === currentValue,
                  })}
                  onClick={() => {
                    handleClick();
                  }}
                >
                  {key}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};
