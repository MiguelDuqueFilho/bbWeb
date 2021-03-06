import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Pagination from "rc-pagination";
import "./Events.css";

import { getList, showUpdate, showDelete } from "./EventsAction";

class EventsList extends Component {
  constructor(props) {
    super(props);
    this.state = { search: { ...props.search } };
  }

  handlePageClick = (page) => {
    this.props.getList(page, this.props.search);
  };

  componentDidUpdate(prevProps, prevState) {
    if (
      prevProps.search.searchHeader !== this.props.search.searchHeader ||
      prevProps.search.eventSelected !== this.props.search.eventSelected
    ) {
      this.setState({ search: { ...this.props.search } });
      this.props.getList(1, this.props.search);
    }
  }

  renderRows() {
    const list = this.props.listEvents.docs || [];

    return list.map((evt) => (
      <tr key={evt.id} className="tr-custom">
        <td className="td-custom">{evt.id}</td>
        <td className="td-custom">{evt.eventName}</td>
        <td className="td-custom">{evt.EventTypes[0].eventTypeName}</td>
        <td className="td-custom">{evt.EventStatus[0].eventStatusName}</td>
        <td className="td-actions">
          <button
            className="btn btn-warning m-1"
            onClick={() => this.props.showUpdate(evt)}
          >
            <i className="fa fa-pencil"></i>
          </button>
          <button
            className="btn btn-danger m-1"
            readOnly={true}
            onClick={() => this.props.showDelete(evt)}
          >
            <i className="fa fa-trash-o"></i>
          </button>
        </td>
      </tr>
    ));
  }

  render() {
    return (
      <div className="row">
        <div className="col-sm-12">
          <div className="card">
            <h4 className="p-3 m-2 bg-primary shadow text-white rounded-lg">
              Eventos
            </h4>
            <div className="card-body">
              <table className="table table-striped ">
                <thead>
                  <tr className="tr-custom">
                    <th className="th-custom w-5">#</th>
                    <th className="th-custom w-40">Evento</th>
                    <th className="th-custom w-30">Tipo</th>
                    <th className="th-custom w-15">Status</th>
                    <th className="th-actions w-10">Ações</th>
                  </tr>
                </thead>
                <tbody>{this.renderRows()}</tbody>
              </table>
            </div>
            <Pagination
              onChange={this.handlePageClick}
              current={this.props.listEvents.page}
              total={this.props.listEvents.total}
              showLessItems
              showTitle={false}
            />
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  listEvents: state.events.listEvents,
  search: state.app.search,
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ getList, showUpdate, showDelete }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(EventsList);
