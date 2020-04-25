import React from 'react';
import {ApplicationPaths} from "./api-authorization/ApiAuthorizationConstants";

export const Home = () => {

  return (
    <div className="flex flex-col justify-center w-full lg:flex-row">
        <div className="w-full flex flex-col justify-center lg:w-1/3">
            <div className="w-3/4 self-center flex flex-col justify-center lg:w-3/4 lg:self-end">
                <div className="text-2xl font-semibold self-start lg:text-4xl">
                    Play With Friends From Anywhere!
                </div>
                <div className="p-3 w-full">
                    <div className="text-md font-bold lg:text-lg">
                        Fine Print    
                    </div>
                    <div className="text-sm lg:text-md">
                        Card sources can be found <a className="text-purple-600 hover:text-purple-900" href="https://crhallberg.com/cah/">here</a> by <a className="text-purple-600 hover:text-purple-900" href="https://crhallberg.com/">Chris Hallberg</a>
                    </div>
                    <div className="text-sm lg:text-md">
                        Cards Against Humanity is distributed under a <a className="text-purple-600 hover:text-purple-900" href="https://creativecommons.org/licenses/by-nc-sa/2.0/">Creative Commons BY-NC-SA 2.0 license</a>, and so is this website and all the data that comes out of it. That means you can use, remix, and share the game for free, but you can't sell it without permission. <a className="text-purple-600 hover:text-purple-900" href="https://cardsagainsthumanity.com/#info">Here</a> is a link to CAH FAQ's for more info.
                    </div>
                </div>
                <div className="flex my-4">
                    <div className="w-1/2 flex text-sm lg:text-md">
                        <a href={ApplicationPaths.Register} className="primary no-underline text-decoration-none hover:text-white" >Get Started!</a>
                    </div>
                </div>
            </div>
        </div>
        <div className="w-full flex justify-center lg:justify-center lg:w-1/3">
            <img src="/images/512px-Cards_Against_Humanity_logo.png"  alt="Cards Against Humanity logo" className="rounded-full self-center h-64 lg:h-auto"/>
        </div>
    </div>
  );
};
