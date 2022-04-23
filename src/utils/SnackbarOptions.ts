const handleStyle = (type: string) => {
  switch (type) {
    case "success":
      return {
        backgroundColor: "#0f6e42",
        border: "2px solid #22c25f",
        color: "#FFF",
        fontSize: "18px",
        textAlign: "center",
      };
    case "error":
      return {
        backgroundColor: "red",
        color: "#FFF",
        fontSize: "18px",
        textAlign: "center",
      };
  }
};
const getSnackbarOptions = (
  type: string,
  position: string = "top-right",
  closeStyle: object = {
    color: "#FFF",
    fontSize: "16px",
  }
) => ({
  position: position,
  style: handleStyle(type),
  closeStyle: closeStyle,
});

export default getSnackbarOptions;
