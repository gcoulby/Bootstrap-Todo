import React, { Component } from "react";

class TodoItem extends Component {
  state = {};
  render() {
    return (
      <React.Fragment>
        <div
          key={"todo_item_" + this.props.todoItem.id}
          className="container-fluid list-group-item "
        >
          <div className="d-flex">
            <label className="d-flex gap-3 flex-grow-1">
              <input
                className="form-check-input"
                type="checkbox"
                value=""
                checked={this.props.todoItem.checked}
                style={{ fontSize: "1.375em" }}
                onChange={(e) =>
                  this.props.onChecked(e, this.props.todoItem.id)
                }
              />
              <span className="pt-1 form-checked-content">
                <strong className={this.props.todoItem.checked ? "strike" : ""}>
                  {this.props.todoItem.title}
                </strong>
              </span>
            </label>

            <button
              className="btn btn-sm btn-danger"
              onClick={() => this.props.onDelete(this.props.todoItem.id)}
            >
              X
            </button>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default TodoItem;
