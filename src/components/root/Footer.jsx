function Footer() {
const footerNavs = [
        { href: 'javascript:void()', name: 'About' },
        { href: 'javascript:void()', name: 'Blog' },
        { href: 'javascript:void()', name: '' },
        { href: 'javascript:void()', name: 'Team' },
        { href: 'javascript:void()', name: 'Careers' },
        { href: 'javascript:void()', name: 'Suuport' }
    ];

    return (
        <footer className="text-gray-500 px-4 py-8 mt-auto w-full bg-white dark:bg-gray-900">
            <div className="max-w-3xl mx-auto flex flex-col items-center text-center">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">Tech-Cart Commercial</h3>
                <p className="leading-relaxed mt-2 text-[15px] max-w-xl">
                    Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                </p>
            </div>
            <ul className="flex flex-wrap justify-center items-center mt-8 gap-x-6 gap-y-3">
                {footerNavs
                    .filter(item => item.name)
                    .map((item, idx) => (
                        <li key={idx}>
                            <a
                                href={item.href}
                                className="hover:text-blue-600 transition-colors duration-150"
                            >
                                {item.name}
                            </a>
                        </li>
                    ))}
            </ul>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-between max-w-3xl mx-auto gap-2">
                <div className="text-xs text-gray-400">&copy; 2025 Tech-Cart Ltd. All rights reserved.</div>
                <p className="font-bold text-sm text-gray-700 dark:text-gray-200">
                    developed by{" "}
                    <a
                        className="text-blue-800 dark:text-blue-400 hover:underline"
                        href="http://github.com/Pravat006"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        @PravatOO6
                    </a>
                </p>
            </div>
            <style jsx>{`
              .svg-icon path,
              .svg-icon polygon,
              .svg-icon rect {
                  fill: currentColor;
              }
          `}</style>
        </footer>
    );
}
export default Footer;