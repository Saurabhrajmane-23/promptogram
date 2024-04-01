import { Children } from 'react';
import '../styles/globals.css';
import Nav from '../components/nav';
import Provider from '../components/provider';

export const metadata = {
   title: 'GossipOn',
   description: "Discover and share gossips",
}


const RootLayout = ({ children }) => {
  return (
    <html lang='en'>
      <body>
         <Provider>
            <div className='main'>
               <div/>
            </div>

            <main className='app'>
               <Nav/>
               {children}
            </main>
         </Provider>
      </body>
    </html>
  )
}

export default RootLayout;
