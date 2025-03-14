"use client";
import React, { useState } from "react";
import NavigationLink from "../NavigationLink/NavigationLink";

type NavigationStatus = "business" | "driver";

const Navigation = () => {
    const [status, setStatus] = useState<NavigationStatus>("business");

    return (
        <nav className="fixed top-0 left-0 w-full flex flex-col justify-center  bg-primary-orange rounded-b-2xl">
            <div className="flex justify-between w-full h-11  px-6 bg-primary-black rounded-b-2xl ">
                <div className="flex justify-center items-end">
                    <NavigationLink to="/business" label="For business" active={status === "business"} onClick={() => setStatus("business")} />
                    <span className="bg-primary-gray mx-4 w-0.5 min-h-full"></span>
                    <NavigationLink to="/driver" label="For drivers" active={status === "driver"} onClick={() => setStatus("driver")} />
                </div>
                <div>
                    {/*  todo partner login btn add */}
                </div>
            </div>
            <div className="flex justify-between items-center w-full h-13"></div>
        </nav>
    )
}

export default Navigation;