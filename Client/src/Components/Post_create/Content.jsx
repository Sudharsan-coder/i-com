const Content = (props) => {
  const val=props.content
  return (
    <div dangerouslySetInnerHTML={{ __html: val }}>
    </div>
  )
}
export default Content