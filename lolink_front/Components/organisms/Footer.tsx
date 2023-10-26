import React, { FC } from 'react'
import Typograph from '../Atoms/Typograph'

const Footer: FC = () => {
  return (
    <footer className="w-full py-12 border-t text-gray-3 border-primary">
      <div className="container px-4 mx-auto">
          <div className="">
              <div className="flex justify-center mb-6 md:mb-0">
                  <Typograph tag='h3'>LoLink</Typograph>
              </div>

              <div className="flex justify-center md:order-3">
                  <a href="#" className="mx-3 text-gray-400 hover:text-gray-300"><i className="fab fa-twitter"></i></a>
                  <a href="#" className="mx-3 text-gray-400 hover:text-gray-300"><i className="fab fa-facebook-f"></i></a>
                  <a href="#" className="mx-3 text-gray-400 hover:text-gray-300"><i className="fab fa-instagram"></i></a>
              </div>

              <nav className="flex flex-wrap justify-center md:justify-end md:flex-1">
                  {/* <a href="#" className="px-3 py-1 hover:underline hover:text-gray-300">회사 소개</a> */}
                  {/* <a href="#" className="px-3 py-1 hover:underline hover:text-gray-300">지원</a> */}
                  {/* <a href="#" className="px-3 py-1 hover:underline hover:text-gray-300">FAQ</a> */}
              </nav>
          </div>

          <div className="mt-8 text-center">
              <p>&copy; {new Date().getFullYear()} LoLink. 모든 권리 보유.</p>
          </div>
      </div>
  </footer>
  )
}

export default React.memo(Footer);
