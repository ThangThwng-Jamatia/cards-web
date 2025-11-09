declare module 'lucide-react' {
  import { FC, SVGProps } from 'react';

  export interface IconProps extends SVGProps<SVGSVGElement> {
    size?: number | string;
    absoluteStrokeWidth?: boolean;
  }

  export type Icon = FC<IconProps>;

  export const Menu: Icon;
  export const X: Icon;
  export const ArrowRight: Icon;
  export const ArrowLeft: Icon;
  export const Smartphone: Icon;
  export const ExternalLink: Icon;
  export const Github: Icon;
  export const Twitter: Icon;
  export const Mail: Icon;
  export const ChevronRight: Icon;
  export const ChevronLeft: Icon;
  export const ChevronDown: Icon;
  export const ChevronUp: Icon;
  export const Check: Icon;
  export const Copy: Icon;
  export const FileText: Icon;
  export const MoreHorizontal: Icon;
  export const Search: Icon;
  export const Dot: Icon;
  export const Circle: Icon;
  export const GripVertical: Icon;

  // Add any other icons you're using
  const lucideReact: {
    [key: string]: Icon;
  };

  export default lucideReact;
}
