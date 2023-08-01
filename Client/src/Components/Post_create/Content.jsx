const Content = () => {
  const val=localStorage.getItem("post_des")
  return (
    <div dangerouslySetInnerHTML={{ __html: val }}>
    </div>
  )
}
export default Content