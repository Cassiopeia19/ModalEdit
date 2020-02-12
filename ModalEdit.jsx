import React from "react";
import ReactModal from "react-modal-resizable-draggable";

class ModelEdit extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      transacationData: [
        {
          title: "Many old",

          description:
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",

          icon: "cloud_queue",

          key: "first"
        },

        {
          title: "Too old",

          description:
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry. ",

          icon: "star_border",

          key: "second"
        },

        {
          title: "Many many gold",

          description:
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry. ",

          icon: "home",

          key: "third"
        }
      ],

      modalIsOpen: false,

      selectedTransaction: null
    };

    this.openModal = this.openModal.bind(this);

    this.closeModal = this.closeModal.bind(this);
  }

  openModal() {
    this.setState({ modalIsOpen: true });
  }

  closeModal() {
    this.setState({ modalIsOpen: false });
  }

  handleEdit(transaction) {
    this.setState({ selectedTransaction: transaction });

    this.openModal();
  }

  handleChange(e, key) {
    const transaction = this.state.selectedTransaction;

    transaction[key] = e.target.value;

    this.setState({ selectedTransaction: transaction });
  }

  handleSubmit() {
    const items = this.state.transacationData.filter(item => {
      return item.key !== this.state.selectedTransaction.key;
    });

    items.push(this.state.selectedTransaction);

    this.setState({ transacationData: items });

    this.closeModal();
  }

  renderTransactions() {
    return this.state.transacationData.map(transaction => {
      return (
        <div>
          <div
            style={{
              backgroundColor: "gray",
              width: "20%",
              padding: "5px",
              margin: "5px"
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center"
              }}
            >
              <h4>{transaction.title}</h4>

              <u
                onClick={() => this.handleEdit(transaction)}
                style={{ corsor: "pointer" }}
              >
                edit
              </u>
            </div>

            <p>{transaction.description}</p>

            <h6>{transaction.key}</h6>
          </div>
        </div>
      );
    });
  }

  render() {
    return (
      <div style={{ padding: "50px" }}>
        {this.renderTransactions()}

        <ReactModal
          initWidth={800}
          initHeight={400}
          onFocus={() => console.log("Modal is clicked")}
          className={"my-modal-custom-class"}
          onRequestClose={this.closeModal}
          isOpen={this.state.modalIsOpen}
        >
          <h3>Edit Transaction</h3>
          <div
            className="body"
            style={{
              display: "flex",

              flexDirection: "column"
            }}
          >
            <input
              onChange={value => this.handleChange(value, "title")}
              style={{ margin: "10px" }}
              placeholder="title"
              value={
                this.state.selectedTransaction !== null
                  ? this.state.selectedTransaction.title
                  : ""
              }
            />
            <textarea
              onChange={value => this.handleChange(value, "description")}
              style={{ margin: "10px" }}
              placeholder="description"
              value={
                this.state.selectedTransaction !== null
                  ? this.state.selectedTransaction.description
                  : ""
              }
            />
          </div>
          <button onClick={() => this.handleSubmit()}>Submit</button>
          <button onClick={this.closeModal}>Close</button>
        </ReactModal>
      </div>
    );
  }
}

export default ModelEdit;
