import React, { ReactNode } from 'react';

interface TypographProps {
  tag: string;
  children: ReactNode;
  secondary?: boolean;
  hover?: boolean;
  color?: string;
}

const Typograph: React.FC<TypographProps> = ({ tag, children, secondary, hover, color }) => {
  const h3SecondaryClass = secondary ? 'text-3xl font-bold rounded-lg bg-sky text-white mobile:text-lg' :'text-3xl font-bold text-primary mobile:text-lg';
  const isHover = hover ? 'hover:text-white' : '';

  const textColor = color ? `text-${color}` : 'text-gray-5';

  switch (tag) {
    case 'h1':
      return <h1 className={`text-5xl font-bold font-roboto text-primary tablet:text-3xl mobile:text-lg`}>{children}</h1>;
    case 'h2':
      return <h2 className={`text-3xl font-bold text-primary tablet:text-xl mobile:text-base`}>{children}</h2>;
    case 'h3':
      return <h3 className={h3SecondaryClass}>{children}</h3>;
    case 'h4':
      return <h4 className={`text-xl mobile:text-base ${textColor}`}>{children}</h4>;
    case 'h5':
      return <h5>{children}</h5>;
    case 'h6':
      return <h6>{children}</h6>;
    case 'p':
      return <p className={`mobile:text-sm ${textColor}`}>{children}</p>;
    case 'span':
      return <span className={`text-gray-5 mobile:text-sm ${isHover}`}>{children}</span>;
    case 'strong':
      return <strong>{children}</strong>;
    case 'em':
      return <em>{children}</em>;
    case 'del':
      return <del>{children}</del>;
    default:
      return <p>{children}</p>;
  };
}

export default React.memo(Typograph);
