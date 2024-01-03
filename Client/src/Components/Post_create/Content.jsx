import { TypographyStylesProvider } from "@mantine/core"

const Content = (props) => {
  const val=props.content
  return (
    <TypographyStylesProvider>
      <div dangerouslySetInnerHTML={{ __html: val }}>
      </div>
    </TypographyStylesProvider>
  )
}
export default Content