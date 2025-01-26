function Footer (){

  const footerNavs = [
      {
          href: 'javascript:void()',
          name: 'About'
      },
      {
          href: 'javascript:void()',
          name: 'Blog'
      },
      {
          href: 'javascript:void()',
          name: ''
      },
      {
          href: 'javascript:void()',
          name: 'Team'
      },
      {
          href: 'javascript:void()',
          name: 'Careers'
      },

      {
          href: 'javascript:void()',
          name: 'Suuport'
      }
  ]

  return (
      <footer className="text-gray-500 bg-white px-4 py-5 max-w-screen-xl mx-auto md:px-8 mt-auto">
          <div className="max-w-lg sm:mx-auto sm:text-center">
             <h3>Tech-Cart Commercial</h3>
              <p className="leading-relaxed mt-2 text-[15px]">
                  Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
              </p>
          </div>
          <ul className="items-center justify-center mt-8 space-y-5 sm:flex sm:space-x-4 sm:space-y-0 flex-wrap">
              {
                  footerNavs.map((item, idx) => (
                      <li className=" hover:text-gray-800">
                          <a key={idx} href={item.href}>
                              { item.name }
                          </a>
                      </li>
                  ))
              }
          </ul>
          <div className="mt-8 items-center justify-between sm:flex">
              <div className="mt-4 sm:mt-0">
                  &copy; 2025 Tect-Cart ltd. All rights reserved.
              </div>
             
          </div>
          <style jsx>{`
              .svg-icon path,
              .svg-icon polygon,
              .svg-icon rect {
                  fill: currentColor;
              }
          `}</style>
      </footer>
  )
}
export default Footer