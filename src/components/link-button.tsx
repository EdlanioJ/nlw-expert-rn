import { Link, LinkProps } from 'expo-router'

type Props = {
  title: string
} & LinkProps<string>

export function LinkButton({ title, ...rest }: Props) {
  return (
    <Link className="text-center font-body text-base text-slate-300" {...rest}>
      {title}
    </Link>
  )
}
