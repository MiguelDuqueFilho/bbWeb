import React, { Component } from "react";
import path from "path";
import { reduxForm, Field, formValueSelector } from "redux-form";
import { urls } from "../../services/utils";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { init } from "./UploadsAction";

class UploadsForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      timestamp: new Date().getTime(),
    };
    this.backPage = this.backPage.bind(this);
  }

  backPage() {
    this.props.init(this.props.listUploads.page);
  }

  render() {
    const { handleSubmit, readOnly } = this.props;
    return (
      <div className="row">
        <div className="col-12">
          <div className="card">
            <h4 className="p-3 m-2 bg-primary shadow text-white rounded-lg">
              {this.props.title}
            </h4>
            <form onSubmit={handleSubmit}>
              <div className="card-body">
                <div className="form-row">
                  <Field
                    component="input"
                    type="number"
                    name="id"
                    hidden={true}
                  />
                  <div className="col-sm-8  form-group">
                    <label htmlFor="fileName">Nome Arquivo</label>
                    <Field
                      className="form-control"
                      component="input"
                      type="text"
                      name="fileName"
                      placeholder="Digite o Titulo"
                      readOnly={readOnly}
                    />
                  </div>
                </div>
                <div className="form-row">
                  <div className="col-12 form-group">
                    <label htmlFor="fileType">Tipo Arquivo</label>
                    <Field
                      className="form-control"
                      component="input"
                      type="text"
                      name="fileType"
                      placeholder="Digite a descrição"
                      readOnly={true}
                    />
                  </div>
                </div>
                <div className="form-row">
                  <div className="col-12  form-group">
                    <label htmlFor="filePath">Arquivo Carregado</label>
                    <Field
                      className="form-control"
                      component="input"
                      type="text"
                      name="filePath"
                      readOnly={true}
                    />
                  </div>
                </div>
                <div className="form-row">
                  <div className="col-3   form-group">
                    <label htmlFor="fileSize">Tamanho</label>
                    <Field
                      className="form-control"
                      component="input"
                      type="text"
                      name="fileSize"
                      readOnly={true}
                    />
                  </div>
                  <div className="col-3   form-group">
                    <label htmlFor="fileUse">Em uso</label>
                    <Field
                      className="form-control"
                      component="select"
                      type="select"
                      name="fileUse"
                      readOnly={readOnly}
                    >
                      <option defaultValue value={false}>
                        Não
                      </option>
                      <option value={true}>Sim</option>
                    </Field>
                  </div>

                  <div className="col-6 upload-image">
                    <img
                      src={`${urls.BASE_URL}/images/uploads/${path.basename(
                        this.props.valuefilePath
                      )}`}
                      alt={`uploads ${path.basename(this.props.valuefilePath)}`}
                    />
                  </div>
                </div>

                <div className="d-flex flex-wrap justify-content-between mt-3">
                  <button
                    type="submit"
                    className={`btn btn-${this.props.submitClass}`}
                  >
                    {this.props.submitLabel}
                  </button>
                  <button
                    type="button"
                    className="btn btn-gray bg-light"
                    onClick={this.backPage}
                  >
                    Cancelar
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

UploadsForm = reduxForm({
  form: "UploadsForm",
  destroyOnUnmount: false,
})(UploadsForm);

const selector = formValueSelector("UploadsForm");

UploadsForm = connect((state) => {
  return {
    valuefilePath: selector(state, "filePath"),
  };
})(UploadsForm);

const mapStateToProps = (state) => ({
  listUploads: state.uploads.listUploads,
});
const mapDispatchToProps = (dispatch) => bindActionCreators({ init }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(UploadsForm);
