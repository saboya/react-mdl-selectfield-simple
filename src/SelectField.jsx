import React, { PropTypes } from 'react'
import { findDOMNode } from 'react-dom'
import classNames from 'classnames'
import mdlUpgrade from 'react-mdl/lib/utils/mdlUpgrade'

const propTypes = {
  children: PropTypes.arrayOf(PropTypes.element),
  className: PropTypes.string,
  disabled: PropTypes.bool,
  error: PropTypes.node,
  floatingLabel: PropTypes.bool,
  id: PropTypes.string,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  required: PropTypes.bool,
  style: PropTypes.object,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ])
}

class Selectfield extends React.Component {
  componentDidMount () {
    if (this.props.error) {
      this.setAsInvalid()
    }
  }

  componentDidUpdate (prevProps) {
    if (
      this.props.required !== prevProps.required ||
      this.props.error !== prevProps.error
    ) {
      findDOMNode(this).MaterialSelectfield.checkValidity()
    }
    if (this.props.disabled !== prevProps.disabled) {
      findDOMNode(this).MaterialSelectfield.checkDisabled()
    }
    if (this.props.value !== prevProps.value && this.inputRef !== document.activeElement) {
      findDOMNode(this).MaterialSelectfield.change(this.props.value)
    }
  }

  setAsInvalid () {
    const elt = findDOMNode(this)
    if (elt.className.indexOf('is-invalid') < 0) {
      elt.className = classNames(elt.className, 'is-invalid')
    }
  }

  render () {
    const { className, id,
      error, floatingLabel, label,
      style, children, ...otherProps } = this.props

    const customId = id || `selectfield-${label.replace(/[^a-z0-9]/gi, '')}`

    const selectProps = {
      className: classNames('mdl-selectfield__select'),
      id: customId,
      ref: (c) => (this.inputRef = c),
      ...otherProps
    }

    const labelContainer = <label className='mdl-selectfield__label' htmlFor={customId}>{label}</label>
    const errorContainer = !!error && <span className='mdl-selectfield__error'>{error}</span>

    const containerClasses = classNames('mdl-selectfield mdl-js-selectfield', {
      'mdl-selectfield--floating-label': floatingLabel
    }, className)

    return (
      <div className={containerClasses} style={style}>
        <select {...selectProps}>
          {children}
        </select>
        {labelContainer}
        {errorContainer}
      </div>
    )
  }
}

Selectfield.propTypes = propTypes

export default mdlUpgrade(Selectfield)
