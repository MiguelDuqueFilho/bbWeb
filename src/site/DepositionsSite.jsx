import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import "./DepositionsSite.css";
import { getDepositionsShow } from "./SiteAction";
import { urls } from "../services/utils";
import Grid from "../component/Grid/Grid";

class DepositionsSite extends Component {
  constructor(props) {
    super(props);
    this.state = {
      timestamp: new Date().getTime(),
    };
  }
  componentDidMount() {
    this.props.getDepositionsShow();
  }
  renderRows() {
    const list = this.props.site.siteDepositions || [];

    return list.map((list) => (
      <Grid key={list.id} cols="10 10 6 4 3" className="carrousel-item">
        <div className="card mb-5">
          <img
            src={`${urls.BASE_URL}/deposition/${list.id}/img?v=${this.state.timestamp}`}
            alt="deposition"
          />
          <div className="card-body">
            <h4 className="card-title">{list.Events[0]["eventName"]}</h4>
            <h5 className="card-title">{list.depositionTitle}</h5>
            <p className="card-text">{list.depositionDescription}</p>
          </div>
        </div>
      </Grid>
    ));
  }

  render() {
    return (
      <div className="section text-center">
        <div className="row">
          <div className="col-md-10 ml-auto mr-auto">
            <h2 className="title">Depoimentos</h2>
          </div>
        </div>
        <div className="top-content">
          <div className="container-fluid">
            <div className="carrousel slide">
              <div className="carrousel-inner flex-wrap">
                {this.renderRows()}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({ site: state.site });
const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ getDepositionsShow }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(DepositionsSite);