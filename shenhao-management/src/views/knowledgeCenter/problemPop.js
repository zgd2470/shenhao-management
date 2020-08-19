import { submitProblem } from '../../api/shenhaoApi'

export default {
  data() {
    return {
      form: this.$form.createForm(this)
    }
  },
  props: {
    isEdit: {
      type: Boolean,
      required: true
    },
    visible: {
      type: Boolean,
      required: true
    },
    closePop: {
      type: Function,
      required: true
    },
    handleGetProblemList: {
      type: Function
    },
    dataInfo: {
      type: Object,
      default: {}
    }
  },
  created() {
    if (this.dataInfo.pmCode) {
      this.form.setFieldsValue(this.dataInfo)
    }
  },
  watch: {
    visible(value) {
      this.form.resetFields()
      if (value && this.dataInfo.pmCode) {
        this.form.setFieldsValue(this.dataInfo)
      }
    }
  },
  methods: {
    handleSubmit(e) {
      this.form.validateFields((err, values) => {
        const newValue = { ...this.dataInfo, ...values }
        if (!values.title || !values.answer || !values.type) {
          return
        }
        submitProblem(newValue).then(res => {
          if (!res.success) {
            this.$message.error(res.message)
            return
          }
          this.closePop()
          this.handleGetProblemList()
          this.$message.success(res.message)
        })
      })
    }
  },
  render() {
    const { getFieldDecorator } = this.form
    const formItemLayout = {
      labelCol: { span: 4 },
      wrapperCol: { span: 16 }
    }
    const formTailLayout = {
      labelCol: { span: 4 },
      wrapperCol: { span: 8, offset: 4 }
    }
    const textareaRow = { minRows: 3, maxRows: 3 }
    const footer = [
      <a-button onClick={this.closePop}>取消</a-button>,
      <a-button type="primary" onClick={this.handleSubmit}>
        确定
      </a-button>
    ]

    return (
      <a-modal title={this.isEdit ? '编辑' : '新增'} visible={this.visible} onCancel={this.closePop} footer={footer}>
        <div style={{ paddingLeft: '50px' }}>
          <a-form form="form">
            <a-form-item label="问题内容:" label-col={formItemLayout.labelCol} wrapper-col={formItemLayout.wrapperCol}>
              {getFieldDecorator('title', {
                rules: [
                  {
                    required: true,
                    message: '请输入问题内容'
                  }
                ]
              })(<a-input allowClear={true} placeholder="请输入问题内容" />)}
            </a-form-item>
            <a-form-item label="问题解答:" label-col={formItemLayout.labelCol} wrapper-col={formItemLayout.wrapperCol}>
              {getFieldDecorator('answer', {
                rules: [
                  {
                    required: true,
                    message: '请输入问题解答'
                  }
                ]
              })(<a-textarea allowClear={true} placeholder="请输入问题解答" auto-size={textareaRow} />)}
            </a-form-item>
            <a-form-item label="问题类型:" label-col={formItemLayout.labelCol} wrapper-col={formItemLayout.wrapperCol}>
              {getFieldDecorator('type', {
                rules: [
                  {
                    required: true,
                    message: '请输入问题类型',
                    type: 'string'
                  }
                ]
              })(
                <a-select placeholder="请选择" allowClear={true}>
                  <a-select-option value="1">操作类</a-select-option>
                  <a-select-option value="2">技术类</a-select-option>
                  <a-select-option value="3">商务类</a-select-option>
                </a-select>
              )}
            </a-form-item>
          </a-form>
        </div>
      </a-modal>
    )
  }
}
