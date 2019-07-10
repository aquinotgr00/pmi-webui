function ActionButton(props) {
  return (
    <a
      href="#" 
      className={"btn btn-table circle-table " + props.class} 
      data-toggle="tooltip" 
      data-placement="top" 
      title={props.title} 
      data-original-title={props.title}>
    </a>
  )
}